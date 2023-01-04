const connectDB = require('../database/db');
const { validationResult } = require('express-validator');
const uploadImgToBucket = require('../helpers/onUploadImgFuncion');

exports.deleteSingleImageNoAlbum = async (req, res, next) => {
    const client = await connectDB();
    const { userId } = req.user;
    const { imageId } = req.params;
    const queryImage = `SELECT * FROM "imageNoAlbum" WHERE "imageId" = '${imageId}' AND "belongsToUser" = '${userId}'`;
    const result = await client.query(queryImage);
    if (result.rowCount === 0) {
        return res.status(200).json({ msg: 'There is not image with the givin ID' });
    }
    try {
        const qDelete = `UPDATE "imageNoAlbum" SET "activeImage" = '0' WHERE "imageId" = '${imageId}' AND "belongsToUser" = ${userId} RETURNING * `;
        const resultDelete = await client.query(qDelete);
        if (resultDelete.rowCount === 1) {
            return res.status(200).json({ msg: 'Your image was deleted succesfully', image: resultDelete.rows[0] });
        }
    } catch (error) {
        console.log(error, 'Unable to delete your image');
        res.status(500).json({ msg: 'Unable to delete your image' });
    }
}

exports.deleteSingleImage = async (req, res, next) => {
    const client = await connectDB();
    const { userId } = req.user;
    const { albumId, imageId } = req.params;
    const queryImage = `SELECT * FROM "singleImage" WHERE "belongsToAlbum" = '${albumId}' AND "imageId" = '${imageId}' AND "belongsToUser" = '${userId}'`;
    const result = await client.query(queryImage);
    if (result.rowCount === 0) {
        return res.status(200).json({ msg: 'There is not image with the givin ID' });
    }
    try {
        // const queryDelete = `DELETE FROM "singleImage" WHERE "imageId" = '${imageId}' AND "belongsToAlbum" = '${albumId}' AND "belongsToUser" = ${userId} RETURNING *`;
        const qDelete = `UPDATE "singleImage" SET "activeImage" = '0' WHERE "imageId" = '${imageId}' AND "belongsToAlbum" = '${albumId}' AND "belongsToUser" = ${userId} RETURNING * `;
        const resultDelete = await client.query(qDelete);
        if (resultDelete.rowCount === 1) {
            return res.status(200).json({ msg: 'Your image was deleted succesfully', image: resultDelete.rows[0] });
        }
    } catch (error) {
        console.log(error, 'Unable to delete your image')
        res.status(500).json({ msg: 'Unable to delete your image' });
    }
}

exports.getAllSingleImagesByAlbum = async (req, res, next) => {
    const client = await connectDB();
    const { userId } = req.user;
    const { albumId } = req.params;
    const queryImages = `SELECT * FROM "singleImage" WHERE "belongsToUser" = '${userId}' AND "belongsToAlbum" = '${albumId}' AND "activeImage" = 1`;
    try {
        const result = await client.query(queryImages);
        if (result.rowCount === 0) {
            return res.status(200).json({ msg: 'There are no images associated with the album', images: [] });
        }
        if (result.rowCount > 0) {
            return res.status(200).json({ msg: 'Your album images', images: result.rows });
        }
    } catch (error) {
        console.log(error, 'Unable to get all your images')
        res.status(500).json({ msg: 'Unable to get your images' });
    }
}

exports.getAllImagesNoAlbum = async (req, res, next) => {
    const client = await connectDB();
    const { userId } = req.user;
    const queryImages = `SELECT * FROM "imageNoAlbum" WHERE "belongsToUser" = '${userId}' AND "activeImage" = 1`;
    try {
        const result = await client.query(queryImages);
        if (result.rowCount === 0) {
            return res.status(200).json({ msg: 'There are no images yet', images: [] });
        }

        if (result.rowCount > 0) {
            return res.status(200).json({ msg: 'Your images', images: result.rows });
        }
    } catch (error) {
        console.log(error, 'Unable to get all your images *-*-*-*')
        res.status(500).json({ msg: 'Unable to get your images' });
    }
}

exports.addImageNoAlbum = async (req, res, next) => {
    const client = await connectDB();
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { userId } = req.user;
    const { belongsToAlbum, imgUrl, description, isPublicImg } = req.body;
    // const queryImage = `INSERT INTO "imageNoAlbum" ("belongsToAlbum", "belongsToUser", "imgUrl") VALUES ($1, $2, $3) RETURNING *`;
    const queryImage = `INSERT INTO "imageNoAlbum" ("belongsToUser", "imgUrl", "description", "isPublicImg") VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [userId, imgUrl, description, isPublicImg];
    try {
        const result = await client.query(queryImage, values);
        if (result.rowCount === 1) {
            return res.status(200).json({ msg: 'Image uploaded correctly', image: result.rows[0] })
        }
    } catch (error) {
        console.log(error, 'Error unable to save your image')
        res.status(500).json({ msg: 'Unable to Save your image' });
    }
}

exports.addNewImage = async (req, res, next) => {

    const client = await connectDB();
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { userId } = req.user;
    const { belongsToAlbum, imgUrl, description, isPublicImg } = req.body;
    const queryImage = `INSERT INTO "singleImage" ("belongsToAlbum", "belongsToUser", "imgUrl", "description", "isPublicImg") VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [belongsToAlbum, userId, imgUrl, description, isPublicImg ];
    try {
        const result = await client.query(queryImage, values);
        if (result.rowCount === 1) {
            res.json({ msg: 'Image saved successfully', image: result.rows[0] });
        }

        if (result.rowCount === 0) {
            res.json({ msg: 'Unable to save your image', image: {} });
        }
    } catch (error) {
        console.log(error, 'Unable to save your image');
        res.status(500).json({ msg: 'Unable to Save your image' });
    }
}

// Add Image Album
exports.addFavoriteImageNoAlbum = async (req, res, next) => {
    const client = await connectDB();
    const { userId } = req.user;
    const { isFav } = req.body;
    const { imageId } = req.params;
    const queryFav = `UPDATE "imageNoAlbum" SET "isFavorite" = '${isFav}' WHERE "imageId" = '${imageId}' AND "belongsToUser" = ${userId} RETURNING * `;
    try {
        const result = await client.query(queryFav);
        let msg = isFav === 1 ? 'Added to favorites' : 'Removed from favorites';
        if (result.rowCount === 1) {
            return res.status(200).json({ msg: msg, image: result.rows[0] })
        }
    } catch (error) {
        console.log(error, 'Unable to save your favorite image')
        res.status(500).json({ msg: 'Unable to save your favorite image' });
    }
}

exports.addFavoriteImageAlbum = async (req, res, next) => {
    const client = await connectDB();
    const { userId } = req.user;
    const { isFav } = req.body;
    const { imageId } = req.params;
    const queryF = `UPDATE "singleImage" SET "isFavorite" = ${isFav} WHERE "imageId" = ${imageId} AND "belongsToUser" = '${userId}' RETURNING *`;
    try {
        const result = await client.query(queryF);
        let msg = isFav === 1 ? 'Added to favorites' : 'Removed from favorites';
        if (result.rowCount === 1) {
            return res.status(200).json({ msg: msg, image: result.rows[0] })
        }
    } catch (error) {
        console.log(error, 'Unable to save your favorite image')
        res.status(500).json({ msg: 'Unable to save your favorite image' });
    }
}

exports.uploadImageToStorage = async (req, res, next) => {
    const myFile = req.files;
    try {
        const urlImg = await uploadImgToBucket(myFile);
        if (urlImg) {
            return res.status(200).json({ msg: 'Image Saved', imgUrl: urlImg })
        }
    } catch (error) {
        console.log(error, 'Unable to upload the IMG')
        res.status(500).json({ msg: 'Unable to save your favorite image' });
    }
}
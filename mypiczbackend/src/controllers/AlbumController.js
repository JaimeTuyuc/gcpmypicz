const { validationResult } = require('express-validator');
const connectDB = require('../database/db');

exports.getAllAlbums = async (req, res, next) => {
    const client = await connectDB();
    const { userId } = req.user;
    try {
        const queryAlbums = `SELECT * FROM "albums" WHERE "belongsTo" = '${userId}' AND "activeAlbum" = '1'`;
        const result = await client.query(queryAlbums);
        if (result.rowCount === 0) {
            res.status(200).json({ msg: 'No albums yet', albums: [] });
        }

        res.status(200).json({ msg: 'Your albums', albums: result.rows });
    } catch (error) {
        console.log(error, 'Unable to ger all your albums');
        res.status(500).json({ msg: 'Unable to get your albums' });
    }
}

exports.getSingleAlbum = async (req, res, next) => {
    const client = await connectDB();
    const { userId } = req.user;
    const { albumId } = req.params;
    const queryAlbum = `SELECT * FROM "albums" WHERE "albumId" = '${albumId}' AND "belongsTo" = '${userId}'`;
    try {
        const result = await client.query(queryAlbum);
        if (result.rowCount === 0) {
            return res.status(200).json({ msg: 'There is no album found with the given id' });
        }

        res.status(200).json({ msg: 'Your album', album: result.rows[0] });
    } catch (error) {
        console.log(error, 'Unable to get the album requested');
        res.status(500).json({ msg: 'Unable to get your albums' });
    }
}

exports.createNewAlbum = async (req, res, next) => {
    const client = await connectDB();
    const { userId } = req.user;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { albumName } = req.body;
    const queryAlbum = `INSERT INTO "albums" ("belongsTo", "albumName", "activeAlbum") VALUES ($1, $2, $3) RETURNING *`;
    const values = [userId, albumName, 1];
    try {
        const result = await client.query(queryAlbum, values);
        if (result.rowCount === 1) {
            return res.status(200).json({ msg: 'Saved it correctly', album: result.rows[0] });
        }
    } catch (error) {
        console.log(error, 'Unable to save your album ');
        res.status(500).json({ msg: 'Unable to save your album ' });
    }
}

exports.updateAlbum = async (req, res, next) => {
    const client = await connectDB();
    const { userId } = req.user;
    const { albumId } = req.params;
    const { albumName, prevImgAlbum, totalItems, albumColor, activeAlbum } = req.body;
    //console.log(albumName, prevImgAlbum, totalItems, albumColor, activeAlbum, 'datos a actualizad');
    const queryAlbum = `SELECT * FROM "albums" WHERE "albumId" = '${albumId}' AND "belongsTo" = '${userId}'`;
    try {
        const result = await client.query(queryAlbum);
        const albumFound = { ...result.rows[0] };
        const updateQuery = `UPDATE "albums" SET "albumName" = '${albumName}', "prevImgAlbum" = '${prevImgAlbum}', "totalItems" = '${totalItems}', "albumColor" = '${albumColor}', "activeAlbum" = '${activeAlbum}' WHERE "albumId" = '${albumId}' AND "belongsTo" = '${userId}' RETURNING *`;
        const updateResult = await client.query(updateQuery);
        if (updateResult.rowCount === 1) {
            return res.status(200).json({ msg: 'Album updated correctly', album: updateResult.rows[0] });
        }
    } catch (error) {
        console.log(error, 'Unable to update your album');
        res.status(500).json({ msg: 'Unable to update your album ' });
    }
}

exports.deleteAlbum = async (req, res, next) => {
    const client = await connectDB();
    const { userId } = req.user;
    const { albumId } = req.params;
    const queryAlbum = `SELECT * FROM "albums" WHERE "albumId" = '${albumId}' AND "belongsTo" = '${userId}'`;
    const foundAlbum = await client.query(queryAlbum);
    if (foundAlbum.rowCount === 0) {
        return res.status(400).json({ msg: 'No album found with the giving ID' });
    }
    const deleteQuery = `UPDATE "albums" SET "activeAlbum" = '0' WHERE "albumId" = '${albumId}' AND "belongsTo" = '${userId}' RETURNING *`;
    try {
        const resultDelete = await client.query(deleteQuery);
        if (resultDelete.rowCount === 1) {
            return res.status(200).json({ msg: 'Album deleted correctly', statusCode: 1 }); // statusCode 1 . success
        }
    } catch (error) {
        console.log(error, 'unable to delete your album');
        res.status(500).json({ msg: 'Unable to delete your album ' });
    }
}
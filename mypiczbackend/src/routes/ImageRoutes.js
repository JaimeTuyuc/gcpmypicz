const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const imageController = require('../controllers/ImageController');

router.post('/images',
    [
        check('belongsToAlbum', 'Please enter the album name').not().isEmpty(),
        check('imgUrl', 'Please choose an image to upload').not().isEmpty(),
    ],
    imageController.addNewImage
)

router.get('/images/all',
    imageController.getAllImagesNoAlbum
)
router.get('/images/:albumId',
    imageController.getAllSingleImagesByAlbum
)

router.post('/images/single',
    [
        check('imgUrl', 'Please choose an image to upload').not().isEmpty(),
    ],
    imageController.addImageNoAlbum
)

router.delete('/images/no-album/:imageId',
    imageController.deleteSingleImageNoAlbum
)

router.delete('/images/:albumId/:imageId',
    imageController.deleteSingleImage
)

router.post('/images/favorite/:imageId',
    imageController.addFavoriteImageAlbum
)

router.post('/images/with-no-album/:imageId',
    imageController.addFavoriteImageNoAlbum
)

router.post('/images/storage',
    imageController.uploadImageToStorage
)

module.exports = router;
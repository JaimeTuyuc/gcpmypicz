const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const albumController = require('../controllers/AlbumController');

router.get('/albums',
    albumController.getAllAlbums
);

router.get('/albums/:albumId',
    albumController.getSingleAlbum
);

router.post('/albums',
    [
        check('albumName', 'The album name is required').not().isEmpty()
    ],
    albumController.createNewAlbum
)

router.put('/albums/:albumId',
    albumController.updateAlbum
)

router.delete('/albums/:albumId',
    albumController.deleteAlbum
)
module.exports = router;
const express = require('express');
const router = express.Router();
const createAccountController = require('../controllers/userController');

router.get('/find-friends/:userName',
    createAccountController.getFriendsInfo
);

module.exports = router;
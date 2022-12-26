const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const profileController = require('../controllers/ProfileController');

router.delete('/profile/delete',
    profileController.deleteAccount
)

router.put('/update',
    [
        check('value', 'Please enter a value to update').not().isEmpty(),
    ],
    profileController.updateUserInfo
);

module.exports = router;
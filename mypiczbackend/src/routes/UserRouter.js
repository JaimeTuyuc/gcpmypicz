const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const createAccountController = require('../controllers/UserController');

router.post('/refresh/:token',
    createAccountController.refreshSessionUser
)

router.post('/register',
    // Inciar sesion
    [
        check('name', 'First name is required').not().isEmpty(),
        check('lastName', 'Last name is required').not().isEmpty(),
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Password needs to be at least 6 characters').isLength({min: 6})
    ],
    createAccountController.createAccount
);

router.post('/forgot-password',

);

router.post('/change-password',

);

module.exports = router;
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const loginController = require('../controllers/LoginController');

router.post('/login', 
    // Inciar sesion
    [
        check('email', 'Email is required to login to your account').not().isEmpty().isEmail(),
        check('password', 'Password is required to login').not().isEmpty()
    ],
    loginController.loginUser
)

module.exports = router;
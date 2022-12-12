const connectDB = require('../database/db');
const { validationResult } = require('express-validator');
const generateToken = require('../helpers/TokenGenerator');
const bcriptjs = require('bcryptjs');

exports.createAccount = async (req, res, next) => {

    const client = await connectDB();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }
    const { name, lastName, email, password } = req.body;
    const salt = await bcriptjs.genSalt(10);
    const hasPass = await bcriptjs.hash(password, salt);
    const token = generateToken();
    const createUser = 'INSERT INTO "users" ("name", "lastName", "email", "userToken", "password", "isAuth", "userName", "isActive", "avatar" ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
    let values = [name, lastName, email, token, hasPass, '0', '', '1', ''];
    try {
        
        const newUser = await client.query(createUser, values);
        if (newUser.rowCount === 1) {
            res.status(200).json({ msg: 'Account created'})
        }
    } catch (error) {
        console.log(error, 'unable to crete your account');
        res.status(500).json({ msg: 'Unable to create your account' });
    }
}

exports.updateUserInfo = async (req, res, next) => {

    try {
        
    } catch (error) {
        console.log(error, 'Unable to update your info');
        res.status(500).json({ msg: 'Unable to update your info' });
    }
}
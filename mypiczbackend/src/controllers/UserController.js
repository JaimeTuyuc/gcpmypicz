const connectDB = require('../database/db');
const { validationResult } = require('express-validator');
const generateToken = require('../helpers/TokenGenerator');
const bcriptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../settings');

exports.createAccount = async (req, res, next) => {
    const client = await connectDB();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }
    const { name, lastName, email, password, avatar } = req.body;
    const salt = await bcriptjs.genSalt(10);
    const hasPass = await bcriptjs.hash(password, salt);
    const token = generateToken();
    const createUser = 'INSERT INTO "users" ("name", "lastName", "email", "userToken", "password", "isAuth", "userName", "isActive", "avatar" ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
    let values = [name, lastName, email, token, hasPass, '0', '', '1', avatar];
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

exports.refreshSessionUser = async (req, res, next) => {
    const client = await connectDB();
    const { jwt_secret_key } = config;
    const { token } = req.params;

    try {
        const decoded = jwt.verify(token, jwt_secret_key)
        const queryUser = `SELECT "userId", "name", "lastName", "email", "userName", "isActive", "avatar", "createdAt", "bio" FROM "users" WHERE "userId" = '${decoded.userId}' AND "isActive" = '1'`;
        const result = await client.query(queryUser);
        if (result.rowCount === 0) {
            return res.status(200).json({ msg: 'Unable to proccess your requuest', user: {}, codeStatus: 3, token: ''})
        }
        if (result.rowCount === 1) {
            return res.status(200).json({msg: 'Welcome back', user: result.rows[0], codeStatus: 1, token: token})
        }
    } catch (error) {
        console.log(error, 'unable to refresh');
        return res.status(500).json({ msg: 'Please login back', codeStatus: 3 });
    }
}

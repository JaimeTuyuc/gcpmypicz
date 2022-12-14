const connectDB = require('../database/db');
const { validationResult } = require('express-validator');
const bcriptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../settings');

const { jwt_secret_key } = config;

exports.loginUser = async (req, res, next) => {

    const client = await connectDB();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    // Extract values
    const { email, password } = req.body;
    const queryUser = `SELECT * FROM "users" WHERE "email" = '${email}'`;
    const result = await client.query(queryUser);
    if (result.rowCount === 1 && result.rows[0].isActive === '0') {
        return res.json({ msg: 'Please verify your credentials', codeStatus: 3 }); // 3 error
    }
    if (result.rowCount === 0) {
        return res.json({ msg: 'Please verify your email address', codeStatus: 2 }); // 2 warning
    }
    
    const userFound = { ...result.rows[0] };

    // Validate that the user has confirmed the account
    // if (userFound.isAuth === '0' && userFound.userToken) {
    //    return res.status(400).json({ msg: 'Please verify your account to continue' });
    // }

    const passwordVerified = await bcriptjs.compare(password, userFound.password);
    if (!passwordVerified) {
        return res.json({ msg: 'Please verify your password', codeStatus: 2  });
    }
    try {
        const payload = {
            userId: userFound.userId,
            name: userFound.name,
            lastName: userFound.lastName
        }

        const data = {};
        data.userId = userFound.userId;
        data.name = userFound.name;
        data.lastName = userFound.lastName;
        data.email = userFound.email;
        data.createdAt = userFound.createdAt;
        data.isActive = userFound.isActive;
        data.avatar = userFound.avatar;
        data.userName = userFound.userName;
        data.bio = userFound.bio;

        jwt.sign(payload, jwt_secret_key, {
            expiresIn: '24h', //TODO change when in production
        }, (error, token) => {
            if (error) throw error;
            res.status(200).json({ msg: 'Logged in successfully', user: data, token: token, codeStatus: 1 }); // 1 success
        })
    } catch (error) {
        console.log(error, 'Unable to complete your request');
    }
}
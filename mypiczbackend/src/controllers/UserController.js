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
    const { name, lastName, email, password, avatar, userName } = req.body;
    const salt = await bcriptjs.genSalt(10);
    const hasPass = await bcriptjs.hash(password, salt);
    const token = generateToken();
    const createUser = 'INSERT INTO "users" ("name", "lastName", "email", "userToken", "password", "isAuth", "userName", "isActive", "avatar" ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
    let values = [name, lastName, email, token, hasPass, '0', userName, '1', avatar];
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

exports.getFriendsInfo = async (req, res, next) => {
    const client = await connectDB();
    const { userName } = req.params;
    const queryUser = `SELECT users."userId", users."name", users."lastName", users."avatar", users."bio" FROM users WHERE users."userName" = '${userName}' AND users."isActive" = '1'`;
     
    try {
        const result = await client.query(queryUser);
        if (result.rowCount === 1) {
            const tempData = { ...result.rows[0] };
            const queryData = `SELECT "imageNoAlbum"."imageId", "imageNoAlbum"."imgUrl", "imageNoAlbum".description, "imageNoAlbum"."isPublicImg", "imageNoAlbum"."createdAt" 
                                FROM "imageNoAlbum" 
                                WHERE "imageNoAlbum"."belongsToUser" = '${tempData.userId}' AND "imageNoAlbum"."isPublicImg" = '1'`;
            const dataResult = await client.query(queryData);
            if (dataResult.rowCount === 0) {
                res.status(200).json({ msg: 'Users info', user: result.rows[0], publicImgs: [], codeStatus: 1 });
            } else {
                res.status(200).json({ msg: 'Users info', user: result.rows[0], publicImgs: dataResult.rows, codeStatus: 1 });
            }
            
        } else {
            res.status(200).json({ msg: 'No users found or incorrect User Name', user: {}, publicImgs: [], codeStatus: 2 });
        }
    } catch (error) {
        console.log(error, 'unable to get your friends info')
    }
}
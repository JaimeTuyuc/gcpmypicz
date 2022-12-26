const connectDB = require('../database/db');
const jwt = require('jsonwebtoken');
const config = require('../settings');

const { jwt_secret_key } = config;

const checkAuthUser = async (req, res, next) => {
    const client = await connectDB();
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, jwt_secret_key);
            const queryUser = `SELECT "userId", "name", "lastName", "email", "userName", "isActive", "avatar", "createdAt", "bio" FROM "users" WHERE "userId" = '${decoded.userId}'`;
            const result = await client.query(queryUser);
            req.user = {...result.rows[0]};
            return next();
        } catch (error) {
            return res.status(404).json({ msg: 'Session expired, please log in again'})
        }
    }

    if (!token) {
        return res.status(401).json({ msg: 'Invalid token, please try again later'})
    }

    next();
}

module.exports = checkAuthUser;
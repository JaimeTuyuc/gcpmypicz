const connectDB = require('../database/db');
const { validationResult } = require('express-validator');

exports.updateUserInfo = async (req, res, next) => {
    const client = await connectDB();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }
    const { field, value } = req.body;
    const { userId } = req.user;
    try {
        const updateUser = `UPDATE "users" SET "${field}" = '${value}' WHERE "userId" = '${userId}' RETURNING "userId", "name", "lastName", "email", "isAuth", "userName", "isActive", "avatar", "createdAt"`;
        const resultUpdate = await client.query(updateUser);
        if (resultUpdate.rowCount === 1) {
            return res.status(200).json({ msg: 'Profile updated', user: resultUpdate.rows[0] });
        }
    } catch (error) {
        console.log(error, 'Unable to update your info');
        res.status(500).json({ msg: 'Unable to update your profile' });
    }
}

exports.deleteAccount = async (req, res, next) => {
    const client = await connectDB();
    const { userId } = req.user;
    try {
        const updateUser = `UPDATE "users" SET "isActive" = '0' WHERE "userId" = '${userId}'`;
        const resultUpdate = await client.query(updateUser);
        if (resultUpdate.rowCount === 1) {
            return res.status(200).json({ msg: 'Accouunt deleted', deleteStatus: 1 });
        }
    } catch (error) {
        console.log(error, 'Unable to delete your account')
        res.status(500).json({ msg: 'Unable to update your profile' });
    }
}
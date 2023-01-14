const connectDB = require('../db/db');

const { logFailure, logSuccess } = require('../logger/logger');

exports.getFriendsInfo = async (req, res, next) => {
    const client = await connectDB();
    const { userName } = req.params;
    const queryUser = `SELECT users."userId", users."name", users."lastName", users."avatar", users."bio" FROM users WHERE users."userName" = '${userName}' AND users."isActive" = '1'`;

    try {
        const result = await client.query(queryUser);

        const startTime = new Date()
        const eventInfo = {
            startTime, action: 'GETTING PROFILE'
        }
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
                logSuccess('Successfully retrieved profile', { ...eventInfo, user: result.rows[0], imgs: dataResult.rows })
            }

        } else {
            res.status(200).json({ msg: 'No users found or incorrect User Name', user: {}, publicImgs: [], codeStatus: 2 });
        }
    } catch (error) {
        console.log(error, 'unable to get your friends info')
        logFailure('An error happened while fetching the profile', {...eventInfo})
    }
}


// https://us-central1-gcp-my-picz.cloudfunctions.net/gcp-cloud-function 

//gcloud functions deploy gcp-cloud-function --entry-point appCloudFunction --runtime nodejs16 --trigger-http --project gcp-my-picz
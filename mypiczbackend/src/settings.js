const { config } = require('dotenv');

config();

module.exports = {
    port: process.env.PORT || 4000,
    db_host: process.env.HOST_DB,
    db_user: process.env.USER_DB,
    db_port: process.env.PORT_DB,
    db_password: process.env.PASSWORD_DB,
    db_database: process.env.DATABASE_DB,
    jwt_secret_key: process.env.SECRET_KEY,
    storage_id: process.env.PROJECT_ID_STORAGE,
    bucket_name: process.env.BUCKET_NAME,
}
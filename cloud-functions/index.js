const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
console.log(process.env.DATABASE_DB, 'credenciales--------')
const {
    requestLogger
} = require('./src/logger/logger');

app.use(requestLogger)

app.use('/api/mypicz', require('./src/routes/userRoute'));

module.exports.appCloudFunction = app;
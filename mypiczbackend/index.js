const express = require('express');
const cors = require('cors');
const config = require('./src/settings');
const checkAuthUser = require('./src/middlewares/Auth');

const app = express();

// Allow valid endpoints
const corsOptions = {
    origin: function(origin, callback) {
        if(whiteLists.includes( origin )) {
            callback(null, true)
        }else {
            callback( new Error(`The URL provided is not a valid URL`))
        }
    }
}

app.use(cors());
app.use(express.json({ extended: true }));
const port = config.port;

// Configure the routes

// Public routes
app.use('/api/mypicz', require('./src/routes/UserRouter'));
app.use('/api/mypicz', require('./src/routes/LoginRoute'));

// Private Routes
app.use('/api/mypicz', checkAuthUser, require('./src/routes/AlbumRoutes'));
app.use('/api/mypicz', checkAuthUser, require('./src/routes/ImageRoutes'));

app.listen((port), () => {
    console.log(`App ready and running on port ${port}`);
})

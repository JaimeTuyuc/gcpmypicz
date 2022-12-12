const { Client } = require('pg');
const config = require('../settings');

const { db_host, db_user, db_port, db_password, db_database } = config;
const dbSettings = {
    host: db_host,
    user: db_user,
    port: db_port,
    password: db_password,
    database: db_database
}

const connectDB = async () => {
    try {
        const client = new Client(dbSettings);
        await client.connect();
        return client;
    } catch (error) {
        console.log(error, 'Unable to connect to DB')
    }
}

module.exports = connectDB;

/*

Connection to DB using Docker

docker run \
-e POSTGRES_PASSWORD=123456 \
-e PGDATA=/var/lib/postgresql/data/pgdata \
-v PICZVOLUME:/var/lib/postgresql/data \
-v $(pwd)/mypiczdb:/docker-entrypoint-initdb.d \
-d -p 7070:5432 postgres:14.5

-v $(pwd)/db:/docker-entrypoint-initdb.d \
*/
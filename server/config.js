require('dotenv').config(); // this loads the defined variables from .env

const config = {
    sessionKey: process.env.SESSION_KEY || 'secret',
    mongodb: {
        uri: process.env.MONGO_DB_URI
    },
    mysql: {
        database: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST
    }
};

module.exports = config;



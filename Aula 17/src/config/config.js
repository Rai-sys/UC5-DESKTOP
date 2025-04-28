// PARA IMIGRAÇÃO
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
 development: {
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_BG_PASSWORD,
    database: process.env.DEV_BG_NOME,
    host: process.env.DEV_BG_HOST,
    port: process.env.DEV_BG_PORTA,
    dialect: 'postgres',
    logging: true
 },

 test: {},

 production: {}

}

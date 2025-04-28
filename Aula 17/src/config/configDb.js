// CONEXAO NO BANCO

const { Sequelize } = require('sequelize');  // importando sequelize
const dotenv = require('dotenv');  // importando dotenv
dotenv.config();

const sequelize = new Sequelize (  // objeto de conexao do sequelize
    process.env.DB_NOME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
)

module.exports = sequelize;  // exportando
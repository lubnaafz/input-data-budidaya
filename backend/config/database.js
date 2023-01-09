let mysql = require('mysql2');
require('dotenv').config();
 
module.exports = {
   HOST: process.env.DB_HOST,
   USER: process.env.DB_USER,
   PASSWORD: process.env.DB_PASS,
   DATABASE: process.env.MYSQL_DB,
   dialect: "mysql",
   pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    }
 };
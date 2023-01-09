const database = require('../config/database');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    database.DATABASE, 
    database.USER, 
    database.PASSWORD, {
        host: database.HOST,
        dialect: database.dialect,
        operatorsAliases: false,

        pool: {
            max: database.max,
            min: database.min,
            acquire: database.acquire,
            idle: database.idle
          }
    });
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/UserModel.js")(sequelize, Sequelize);
module.exports = db;

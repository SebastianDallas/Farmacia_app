const { Sequelize }= require('sequelize');
const configConnect = require('../config/databaseConfig');

const db = new Sequelize(configConnect);

module.exports = db;

require('dotenv').config();

const { DB_USER, DB_PASSW, DATABASE, DB_HOST } = process.env;

module.exports = {
	username: DB_USER,
	password: DB_PASSW,
	database: DATABASE,
	host: DB_HOST,
	dialect: 'mysql',
};

let {Sequelize, Model } = require('sequelize');
const db = require('../index');

class Admin extends Model {
	id;
	username;
	passw;
	isAdmin;
	createdAt;
	updatedAt;
}

Admin.init({
	id: {
		type: Sequelize.INTEGER,
		unique: true,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	passw: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	isAdmin: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE
}, {
	sequelize: db,
	tableName: 'other',
	timestamps: true,
	underscored: true,
});

module.exports = Admin;
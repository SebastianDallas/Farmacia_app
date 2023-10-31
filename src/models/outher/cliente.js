let {Sequelize, Model } = require('sequelize');
const db = require('../index');

class Cliente extends Model {
	id;
	name;
	biNumber;
	email;
	phoneNumber;
	address;
	createdAt;
	updatedAt;
}

Cliente.init({
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		unique: true,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	biNumber: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: true
		}
	},
	phoneNumber: Sequelize.INTEGER,
	address: Sequelize.STRING,
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE
}, {
	sequelize: db,
	tableName: 'clientes',
	timestamps: true,
	underscored: true,
});

module.exports = Cliente;
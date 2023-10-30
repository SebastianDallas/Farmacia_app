let { Sequelize: sequelize, Model } = require('sequelize');
const db = require('../index');

class Fornecedor extends Model {
	id;
	companyName;
	email;
	phoneNumber;
	address;
	createdAt;
	updatedAt;
}

Fornecedor.init({
	id: {
		type: sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		unique: true,
		primaryKey: true
	},
	companyName: {
		type: sequelize.STRING,
		allowNull: false
	},
	email: {
		type: sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: true
		}
	},
	phoneNumber: {
		type: sequelize.INTEGER,
		allowNull: false
	},
	address: sequelize.STRING,
	createdAt: sequelize.DATE,
	updatedAt: sequelize.DATE
}, {
	sequelize: db,
	tableName: 'detalhes_sales',
	timestamps: true,
	underscored: true
});

module.exports = Fornecedor;
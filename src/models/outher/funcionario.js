let { Sequelize: sequelize, Model } = require('sequelize');
const db = require('../index');

class Funcionario extends Model {
	id;
	fullName;
	biNumber;
	birthday;
	email;
	phoneNumber;
	address;
	password;
	functions;
	contratData;
	salary;
	createdAt;
	updatedAt;
}

Funcionario.init({
	id: {
		type: sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		unique: true,
		primaryKey: true
	},
	fullName: {
		type: sequelize.STRING,
		allowNull: false
	},
	biNumber: {
		type: sequelize.INTEGER,
		allowNull: false,
		unique: true
	},
	birthday: {
		type: sequelize.DATE,
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
		type: sequelize.STRING,
		allowNull: false
	},
	address:  {
		type: sequelize.INTEGER,
		allowNull: false
	},
	password: {
		type: sequelize.INTEGER,
		allowNull: false
	},
	functions: {
		type: sequelize.INTEGER,
		allowNull: false
	},
	contratData: {
		type: sequelize.DATE,
		allowNull: false
	},
	salary: {
		type: sequelize.INTEGER,
		allowNull: false
	},
	createdAt: sequelize.DATE,
	updatedAt: sequelize.DATE
}, {
	sequelize: db,
	tableName: 'detalhes_sales',
	timestamps: true,
	underscored: true
});

module.exports = Funcionario;
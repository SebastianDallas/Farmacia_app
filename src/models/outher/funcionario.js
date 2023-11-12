let { Sequelize: sequelize, Model } = require('sequelize');
const db = require('../index');
const Login = require('./login');
class Funcionario extends Model {
	id;
	fullName;
	biNumber;
	birthday;
	email;
	phoneNumber;
	address;
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
		type: sequelize.STRING,
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
		type: sequelize.STRING,
		allowNull: false
	},
	createdAt: sequelize.DATE,
	updatedAt: sequelize.DATE
}, {
	sequelize: db,
	tableName: 'funcionarios',
	timestamps: true,
	underscored: true
});

Login.belongsTo(Funcionario, { foreignKey: 'userId'});
Funcionario.hasOne(Login, { foreignKey: 'userId'});

module.exports = Funcionario;
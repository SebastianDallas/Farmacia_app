let {Sequelize, Model } = require('sequelize');
const db = require('../index');
const Funcionario = require('./funcionario');

class Login extends Model {
	id;
	userId;
	passwConfirm;
	passwActive;
	textConfirm;
	createdAt;
	updatedAt;
}

Login.init({
	id: {
		type: Sequelize.INTEGER,
		unique: true,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'funcionarios',
			key: 'id',
		},
		onDelete: 'RESTRICT',
		onUpdate: 'CASCADE'
	},
	passwConfirm: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	passwActive: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	textConfirm: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE
}, {
	sequelize: db,
	tableName: 'login',
	timestamps: true,
	underscored: true,
});

Login.belongsTo(Funcionario, {foreignKey: 'user_id'});
Funcionario.hasOne(Login);

module.exports = Login;
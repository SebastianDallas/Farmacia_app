let { Sequelize: sequelize, Model } = require('sequelize');
const db = require('../index');
const Funcionario = require('./funcionario');
const Cliente = require('./cliente');

class Vendas extends Model {
	id;
	cliente_id;
	funcionario_id;
	total;
	method_payment;
	date_sale;
	createdAt;
	updatedAt;
}

Vendas.init({
	id: {
		type: sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		unique: true,
		primaryKey: true
	},
	clienteId: {
		type: sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'clientes',
			key: 'id'
		},
		onDelete: 'RESTRICT',
		onUpdate: 'CASCADE'
	},
	funcionarioId: {
		type: sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'funcionarios',
			key: 'id'
		},
		onDelete: 'RESTRICT',
		onUpdate: 'CASCADE'
	},
	total: {
		type: sequelize.INTEGER,
		allowNull: false
	},
	methodPayment: {
		type: sequelize.STRING,
		allowNull: false
	},
	dateSale: {
		type: sequelize.DATE,
		allowNull: false
	},
	createdAt: sequelize.DATE,
	updatedAt: sequelize.DATE
},  {
	sequelize: db,
	tableName: 'vendas',
	timestamps: true,
	underscored: true,
});

Funcionario.belongsToMany(Cliente, {
	foreignKey: 'funcionarioId',
	otherKey: 'clienteId',
	as: 'vendeu',
	through: Vendas
});

Cliente.belongsToMany(Funcionario, {
	foreignKey: 'clienteId',
	otherKey: 'funcionarioId',
	as: 'comprou',
	through: Vendas
});

module.exports = Vendas;
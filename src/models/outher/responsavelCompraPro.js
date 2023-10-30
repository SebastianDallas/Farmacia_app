let { Sequelize: sequelize, Model } = require('sequelize');
const db = require('../index');
const Venda_produto = require('./compra_produtos');
const Funcionario = require('./funcionario');


class Responsavel_comp_product extends Model {
	id;
	buyProductId;
	funcionarioId;
	dataOfBuy;
	createdAt;
	updatedAt;
}

Responsavel_comp_product.init({
	id: {
		type: sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
	},
	buyProductId: {
		type: sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'venda_produtos',
			key: 'id',
		},
		onDelete: 'RESTRICT',
		onUpdate: 'CASCADE'
	},
	funcionarioId: {
		type: sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'funcionarios',
			key: 'id',
		},
		onDelete: 'RESTRICT',
		onUpdate: 'CASCADE'
	},
	dataOfBuy: {
		type: sequelize.DATE,
		allowNull: false,
	},
	createdAt: sequelize.DATE,
	updatedAt: sequelize.DATE
}, {
	sequelize: db,
	modelName: 'stock',
	underscored: true,
	timestamps: true
});

Funcionario.belongsToMany(Venda_produto, {
	foreignKey: 'funcionarioId',
	otherKey: 'buyProductId',
	as: 'Comprou',
	through: Responsavel_comp_product
});

Venda_produto.belongsToMany(Funcionario, {
	foreignKey: 'buyProductId',
	otherKey: 'funcionarioId',
	as: 'acrescetou',
	through: Responsavel_comp_product
});

module.exports = Responsavel_comp_product;
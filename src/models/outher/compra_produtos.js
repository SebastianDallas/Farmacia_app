let {Sequelize, Model } = require('sequelize');
const db = require('../index');
const Stock = require('./stock');
const Fornecedor = require('./fornecedor');


class Venda_produto extends Model {
	id;
	qtdBuy;
	priceUnitary;
	priceTotal;
	dataOfBuy;
	fornecedoresId;
	stockId;
	createdAt;
	updatedAt;
}

Venda_produto.init({
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
	},

	qtdBuy: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	priceUnitary: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	priceTotal: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	dataOfBuy: {
		type: Sequelize.DATE,
		allowNull: false,
	},
	fornecedoresId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'fornecedor',
			key: 'id',
		},
		onDelete: 'RESTRICT',
		onUpdate: 'CASCADE'
	},
	stockId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'stock',
			key: 'id',
		},
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	},
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE
}, {
	sequelize: db,
	modelName: 'stock',
	underscored: true,
	timestamps: true
});

Fornecedor.belongsToMany(Stock, {
	foreignKey: 'fornecedorId',
	otherKey: 'stockID',
	as: 'vendeu',
	through: Venda_produto
});

Stock.belongsToMany(Fornecedor, {
	foreignKey: 'stockID',
	otherKey: 'fornecedorId',
	as: 'acrescetou',
	through: Venda_produto
});

module.exports = Venda_produto;
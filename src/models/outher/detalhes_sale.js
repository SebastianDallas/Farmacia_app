let {Sequelize: sequelize, Model } = require('sequelize');
const db = require('../index');
const Vendas = require('./venda-cliente');
const Produto = require('./produtos');

class Detalhes_sales extends Model {
	id;
	vendaId;
	produtoId;
	total;
	priceUnitary;
	qtd_sale;
	totalItem;
	createdAt;
	updatedAt;
}

Detalhes_sales.init({
	id: {
		type: sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		unique: true,
		primaryKey: true
	},
	vendaId: {
		type: sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'vendas',
			key: 'id'
		},
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	},
	produtoId: {
		type: sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'produtos',
			key: 'id'
		},
		onDelete: 'RESTRICT',
		onUpdate: 'CASCADE'
	},
	total: {
		type: sequelize.INTEGER,
		allowNull: false
	},
	priceUnitary: {
		type: sequelize.INTEGER,
		allowNull: false
	},
	qtdSale: {
		type: sequelize.INTEGER,
		allowNull: false
	},
	totalItem: {
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

Vendas.belongsToMany(Produto, {
	foreignKey: 'vendaId',
	otherKey: 'produtoId',
	as: 'Vendas',
	through: Detalhes_sales
});

Produto.belongsToMany(Vendas, {
	foreignKey: 'produtoId',
	otherKey: 'vendaId',
	as: 'Compras',
	through: Detalhes_sales
});

module.exports = Detalhes_sales;
let { Sequelize: sequelize, Model } = require('sequelize');
const db = require('../index');
const Produto = require('./produtos');

class Stock extends Model {
	id;
	produtoId;
	qtdStock;
	dateUpdated;
	createdAt;
	updatedAt;
}

Stock.init({
	id: {
		type: sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		unique: true,
		primaryKey: true
	},
	produtoId: {
		type: sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'produtos',
			key: 'id'
		},
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	},
	qtdStock: {
		type: sequelize.INTEGER,
		allowNull: false
	},
	dateUpdated: {
		type: sequelize.Date,
		allowNull: false
	},
	createdAt: sequelize.DATE,
	updatedAt: sequelize.DATE
}, {
	sequelize: db,
	modelName: 'stock',
	underscored: true,
	timestamps: true
});

Produto.hasOne(Stock);
Stock.belongsTo(Produto);

module.exports = Stock;
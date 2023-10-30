let { Sequelize: sequelize, Model } = require('sequelize');
const db = require('../index');
const Categoria = require('./categorias');

class Produto extends Model {
	id;
	name;
	description;
	priceInitary;
	priceInbulk;
	currentStock;
	stockMin;
	categoriaId;
	validDate;
	createdAt;
	updatedAt;
}

Produto.init({
	id: {
		type: sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		unique: true,
		primaryKey: true
	},
	name: {
		type: sequelize.STRING,
		allowNull: false,
	},
	description: {
		type: sequelize.STRING,
		allowNull: false,
	},
	priceUnitary: {
		type: sequelize.INTEGER,
		allowNull: false,
	},
	priceInbulk: {
		type: sequelize.INTEGER,
		allowNull: false,
	},
	currentStock: {
		type: sequelize.INTEGER,
		allowNull: false,
	},
	stockMin: {
		type: sequelize.INTEGER,
		allowNull: false,
	},
	categoriaId: {
		type: sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'categorias',
			key: 'id'
		},
		onDelete: 'RESTRICT',
		onUpdate: 'CASCADE'
	},
	validDate: {
		type: sequelize.DATE,
		allowNull: false
	},
	createdAt: sequelize.DATE,
	updatedAt: sequelize.DATE
}, {
	sequelize: db,
	tableName: 'categorias',
	underscored: true,
	timestamps: true
});

Produto.belongsTo(Categoria);
Categoria.hasMany(Produto);

module.exports = Produto;

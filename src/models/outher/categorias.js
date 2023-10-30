let {Sequelize, Model } = require('sequelize');
const db = require('../index');


class Categoria extends Model {
	id;
	nameCategory;
	description;
	createdAt;
	updatedAt;
}

Categoria.init({
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		unique: true,
		primaryKey: true
	},
	nameCategory: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false
	},
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE
},{
	sequelize: db,
	tableName: 'categorias',
	underscored: true,
	timestamps: true
});

module.exports = Categoria;
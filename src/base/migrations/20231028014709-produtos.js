'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('produtos', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				unique: true,
				primaryKey: true
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			description: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			price_unitary: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			price_inbulk: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			current_stock: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			stock_min: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			categoria_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'categorias',
					key: 'id'
				},
				onDelete: 'RESTRICT',
				onUpdate: 'CASCADE'
			},
			valid_date: {
				type: Sequelize.DATE,
				allowNull: false
			},
			created_at: Sequelize.DATE,
			updated_at: Sequelize.DATE
		});
	},

	async down (queryInterface) {
		await queryInterface.dropTable('produtos');
	}
};

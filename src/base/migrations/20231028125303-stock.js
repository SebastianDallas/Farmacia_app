'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('stock', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				unique: true,
				primaryKey: true
			},
			produto_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'produtos',
					key: 'id'
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE'
			},
			qtd_stock: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			date_updated: {
				type: Sequelize.DATE,
				allowNull: false
			},
			created_at: Sequelize.DATE,
			updated_at: Sequelize.DATE
		});
	},

	async down (queryInterface) {
		await queryInterface.dropTable('stock');
	}
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('detalhes_sales', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				unique: true,
				primaryKey: true
			},
			vendas_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'vendas',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			produto_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'produtos',
					key: 'id'
				},
				onUpdate: 'RESTRICT',
				onDelete: 'CASCADE',
			},
			total: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			price_unitary: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			qtd_sale: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			total_item: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			created_at: Sequelize.DATE,
			updated_at: Sequelize.DATE

		});
	},

	async down (queryInterface) {
		await queryInterface.dropTable('detalhes_sales');
	}
};

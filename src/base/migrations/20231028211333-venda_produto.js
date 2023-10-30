'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('venda_produtos', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				unique: true,
				primaryKey: true,
			},
			qtd_buy: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			price_unitary: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			price_total: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			data_of_buy: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			fornecedores_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'fornecedores',
					key: 'id',
				},
				onDelete: 'RESTRICT',
				onUpdate: 'CASCADE'
			},
			stock_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue:0,
				references: {
					model: 'stock',
					key: 'id',
				},

				onDelete: 'RESTRICT',
				onUpdate: 'CASCADE'
			},
			created_at: Sequelize.DATE,
			updated_at: Sequelize.DATE
		});
	},

	async down (queryInterface) {
		await queryInterface.dropTable('venda_produtos');
	}
};

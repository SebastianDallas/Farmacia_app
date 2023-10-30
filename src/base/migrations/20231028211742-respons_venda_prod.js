'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('responsavel_compra_produto', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				unique: true,
				primaryKey: true,
			},
			buy_product_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'venda_produtos',
					key: 'id',
				},
				onDelete: 'RESTRICT',
				onUpdate: 'CASCADE'
			},
			funcionario_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'funcionarios',
					key: 'id',
				},
				onDelete: 'RESTRICT',
				onUpdate: 'CASCADE'
			},
			data_of_buy: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			created_at: Sequelize.DATE,
			updated_at: Sequelize.DATE
		});
	},

	async down (queryInterface) {
		await queryInterface.dropTable('responsavel_compra_produto');
	}
};

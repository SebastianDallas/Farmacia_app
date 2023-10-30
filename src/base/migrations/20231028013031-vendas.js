'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('vendas', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				unique: true,
				primaryKey: true
			},
			cliente_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'clientes',
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
					key: 'id'
				},
				onDelete: 'RESTRICT',
				onUpdate: 'CASCADE'
			},
			total: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			method_payment: {
				type: Sequelize.STRING,
				allowNull: false
			},
			date_sale: {
				type: Sequelize.DATE,
				allowNull: false
			},
			created_at: Sequelize.DATE,
			updated_at: Sequelize.DATE
		});
	},

	async down (queryInterface) {
		await queryInterface.dropTable('vendas');
	}
};

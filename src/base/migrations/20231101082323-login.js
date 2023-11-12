'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('login', {
			id: {
				type: Sequelize.INTEGER,
				unique: true,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'funcionarios',
					key: 'id',
				},
				onDelete: 'RESTRICT',
				onUpdate: 'CASCADE',
				unique: true
			},
			username: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			passw_confirm: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			passw_active: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			text_confirm: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			created_at: Sequelize.DATE,
			updated_at: Sequelize.DATE
		});
	},

	async down (queryInterface) {
		await queryInterface.dropTable('login');
	}
};

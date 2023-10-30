'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('categorias', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				unique: true,
				primaryKey: true
			},
			name_category: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			description: {
				type: Sequelize.STRING,
				allowNull: false
			},
			created_at: Sequelize.DATE,
			updated_at: Sequelize.DATE
		});
	},

	async down (queryInterface) {
		await queryInterface.dropTable('categorias');
	}
};

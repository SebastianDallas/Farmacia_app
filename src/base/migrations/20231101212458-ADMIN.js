'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('other', {
			id: {
				type: Sequelize.INTEGER,
				unique: true,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			username: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			passw: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			is_admin: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE
		});
	},

	async down (queryInterface) {
		await queryInterface.dropTable('other');
	}
};

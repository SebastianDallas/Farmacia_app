'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('fornecedores', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				unique: true,
				primaryKey: true
			},
			company_name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			nif: {
				type: Sequelize.STRING,
				unique: true
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					isEmail: true
				}
			},
			phone_number: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			address: Sequelize.STRING,
			created_at: Sequelize.DATE,
			updated_at: Sequelize.DATE
		});
	},

	async down (queryInterface) {
		await queryInterface.dropTable('fornecedores');
	}
};

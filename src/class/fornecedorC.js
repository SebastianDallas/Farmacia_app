const Fornecedores = require('../models/outher/fornecedor');
const validator = require('validator');
const { ErrorsSql } = require('../shared/Errors');
const { organizaData } = require('../shared/functionsShared');

class Fornecedor {
	constructor(){
		this.fornecedores;
		this.Errors = new Array();
	}

	cleanData(body){
		this.fornecedores = this.valid(body);
	}

	valid(data){
		for (const key in data) {
			if(validator.isEmpty(data[key])) data[key] = '';

			if (key == 'companyName') {
				if(!validator.isLength(data[key], {min: 4, max: 30})) this.Errors.push('companyName deve conter no minímo 5 caracteres!!!');

				data[key] = data[key].toUpperCase();
			}

			if (key == 'email' && data[key]) {
				if(!validator.isEmail(data[key])) this.Errors.push('formato do email do fornecedor invalido!!!');
			}

			if (key == 'phoneNumber') {
				if(!validator.isLength(data[key], {min:9, max:14}) && isNaN(data[key])) this.Errors.push('número de telefone do fornecedor Invalido!!!');
			}

			if (key == 'address') {
				if(!validator.isLength(data[key], {min: 4, max: 30})) this.Errors.push('endereço do fornecedor deve conter no minímo 5 caracteres!!!');
			}
		}

		return organizaData(data, ['companyName', 'nif', 'email',	'phoneNumber', 'address']);
	}

	async saveData(obj){
		try {
			await Fornecedores.create(obj);
		} catch (error) {
			this.Errors.push('Erro ao salvar os dados do Fornecedores');
			ErrorsSql(error, this.Errors);
			if(error.parent) this.Errors.push(error.parent.sqlMessage);
		}
	}

	async updatadData(oldData, newData){
		try {
			return await Fornecedores.update(newData, {
				where: oldData
			});
		} catch (error) {
			this.Errors.push('Erro ao actualizar os dados do Fornecedores');
			ErrorsSql(error, this.Errors);
			if(error.parent) this.Errors.push(error.parent.sqlMessage);
		}
	}

	async showData(){
		try {
			return await Fornecedores.findAll({
				attributes: ['companyName','email','phoneNumber','address']
			});
		} catch (error) {
			this.Errors.push('Erro ao buscar os dados dos Fornecedores');
			ErrorsSql(error, this.Errors);
			if(error.parent) this.Errors.push(error.parent.sqlMessage);
		}
	}
}

module.exports = Fornecedor;
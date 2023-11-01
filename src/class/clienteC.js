const Clientes = require('../models/outher/cliente');
const validator = require('validator');
const { ErrorsSql } = require('../shared/Errors');
const { organizaData } = require('../shared/functionsShared');

class Cliente {
	constructor(){
		this.clientes;
		this.Errors = new Array();
	}

	cleanData(body){
		this.clientes = this.valid(body);
	}

	valid(data){
		for (const key in data) {
			if(validator.isEmpty(data[key])) data[key] = '';

			if (key == 'name') {
				if(!validator.isLength(data[key], {min: 4, max: 30})) this.Errors.push('nome do cliente deve conter no minímo 5 caracteres!!!');

				data[key] = data[key].toUpperCase();
			}

			if (key == 'biNumber') {
				if(!validator.isLength(data[key], {min: 13, max: 20})) this.Errors.push('bi deve conter no minímo 13 caracteres!!!');

				data[key] = data[key].toUpperCase();
			}

			if (key == 'email' && data[key]) {
				if(!validator.isEmail(data[key])) this.Errors.push('formato do email do cliente invalido!!!');
			}

			if (key == 'phoneNumber') {
				if(!validator.isLength(data[key], {min:9, max:14}) && !isNaN(data[key])) this.Errors.push('número de telefone do cliente Invalido!!!');
			}

			if (key == 'address') {
				if(!validator.isLength(data[key], {min: 4, max: 30})) this.Errors.push('endereço do cliente deve conter no minímo 5 caracteres!!!');
			}
		}

		return organizaData(data, ['name', 'biNumber', 'email',	'phoneNumber', 'address']);
	}

	async saveData(obj){
		try {
			await Clientes.create(obj);
		} catch (error) {
			this.Errors.push('Erro ao salvar os dados do clientes');
			ErrorsSql(error, this.Errors);
			if(error.parent) this.Errors.push(error.parent.sqlMessage);
		}
	}

	async updatadData(oldData, newData){
		try {
			return await Clientes.update(newData, {
				where: oldData
			});
		} catch (error) {
			this.Errors.push('Erro ao actualizar os dados do clientes');
			ErrorsSql(error, this.Errors);
			if(error.parent) this.Errors.push(error.parent.sqlMessage);
		}
	}

	async showData(){
		try {
			return await Clientes.findAll({
				attributes: ['name','email','phoneNumber','address']
			});
		} catch (error) {
			this.Errors.push('Erro ao buscar os dados dos clientes');
			ErrorsSql(error, this.Errors);
			if(error.parent) this.Errors.push(error.parent.sqlMessage);
		}
	}
}

module.exports = Cliente;
const Funcionarios = require('../models/outher/funcionario');
const validator = require('validator');
const { ErrorsSql } = require('../shared/Errors');
const { organizaData } = require('../shared/functionsShared');
const bcrypt = require('bcrypt');

class Funcionario{
	constructor(){
		this.funcionary;
		this.Errors = new Array();
	}

	cleanData(body){
		this.funcionary = this.valid(body);

		return this.funcionary;
	}

	valid(data){
		for (const key in data) {
			if(validator.isEmpty(data[key])) data[key] = '';

			if (key == 'fullName') {
				if(!validator.isLength(data[key], {min: 4, max: 50})) this.Errors.push('fullName deve conter no minímo 5 caracteres!!!');

				data[key] = data[key].toUpperCase();
			}

			if (key == 'biNumber') {
				if(!validator.isLength(data[key], {min: 13, max: 20})) this.Errors.push('bi deve conter no minímo 13 caracteres!!!');

				data[key] = data[key].toUpperCase();
			}

			if (key == 'email' && data[key]) {
				if(!validator.isEmail(data[key])) this.Errors.push('formato do email do funcionario invalido!!!');
			}

			if (key == 'phoneNumber') {
				if(!validator.isLength(data[key], {min:9, max:14}) && isNaN(data[key])) this.Errors.push('número de telefone do funcionarioInvalido!!!');
			}

			if (key == 'birthday' || key == 'contratData') {
				if(!data[key] && !validator.isLength(data[key], {min: 8, max: 10})) this.Errors.push(`digite uma data valida. ex: 02-10-1999 ${key}!!!`);

				let aux = data[key].split('-' || '.' || '/');
				let aux2 = aux.reverse();

				data[key] = aux2.join('-');
			}

			if (key == 'address') {
				if(!validator.isLength(data[key], {min: 4, max: 30})){
					this.Errors.push('endereço do funcionariodeve conter no minímo 5 caracteres!!!');
				}
			}

			if (key == 'password') {
				if(!validator.isLength(data[key], {min: 6, max: 30}))	this.Errors.push('endereço do funcionariodeve conter no minímo 5 caracteres!!!');

				data[key] = bcrypt.hashSync(data[key], 8);
			}
		}

		return organizaData(data, ['fullName', 'biNumber', 'birthday', 'email', 'phoneNumber', 'address']);
	}

	async saveData(obj){
		try {
			await Funcionarios.create(obj);
		} catch (error) {
			this.Errors.push('Erro ao salvar os dados do funcionarios');
			ErrorsSql(error, this.Errors);
			if(error.parent) this.Errors.push(error.parent.sqlMessage);
		}
	}

	async updatadData(oldData, newData){
		try {
			return await Funcionarios.update(newData, {
				where: oldData
			});
		} catch (error) {
			this.Errors.push('Erro ao actualizar os dados do funcionarios');
			ErrorsSql(error, this.Errors);
			if(error.parent) this.Errors.push(error.parent.sqlMessage);
		}
	}

	async showData(){
		try {
			return await Funcionarios.findAll({
				attributes: ['fullName', 'biNumber', 'birthday', 'email', 'phoneNumber', 'address']
			});
		} catch (error) {
			this.Errors.push('Erro ao buscar os dados dos funcionarios');
			ErrorsSql(error, this.Errors);
			if(error.parent) this.Errors.push(error.parent.sqlMessage);
		}
	}
}

module.exports = Funcionario;
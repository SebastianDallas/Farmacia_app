const LOgin = require('../models/outher/login');
const validator = require('validator');
const { middleware } = require('../shared');
const bcrypt = require('bcrypt');

class Login {
	constructor(){
		this.login;
		this.Errors = new Array();
	}

	cleanData(body){
		this.login = this.valid(body);
	}

	valid(data){
		for (const key in data) {
			if(validator.isEmpty(data[key])) data[key] = '';

			if (key == 'username') {
				if(!validator.isLength(data[key], {min: 4, max: 30})) this.Errors.push('usernome do cliente deve conter no minímo 5 caracteres!!!');

				data[key] = data[key].toLowerCase();
			}

			if(key == 'userId') {
				if(isNaN(data[key])) this.Errors.push('id do usuario é requerido');
			}

			if(key == 'passwConfirm'){
				if(validator.isEmpty(data[key])) this.Errors.push('confirme a senha');

				let salt = bcrypt.genSaltSync(10, 'a');

				data[key] = bcrypt.hash(data[key], salt);
			}

			if(key == 'passwActive'){

				if(validator.isEmpty(data[key])) this.Errors.push('a senha é requerida!');

				if(!validator.isLength(data[key], { min: 8, max: 30})) this.Errors.push('a senha precisa conter no minimo 8 caracteres');

				let salt = bcrypt.genSaltSync(10, 'a');

				data[key] = bcrypt.hash(data[key], salt);
			}

			if(key == 'textConfirm'){
				if(validator.isEmpty(data[key])) this.Errors.push('informe um texto que auxilie vc a recordar...!!!');

				data[key] = data[key].toLowerCase();
			}
		}
		return middleware.otherFunc.organizaData(data, ['username', 'userId', 'passwConfirm', 'passwActive', 'textConfirm']);
	}

	async Login(obj){
		try {
			await LOgin.create(obj);
		} catch (error) {
			this.Errors.push('Erro ao registrar dados de login');
			middleware.Errors.ErrorsSql(error, this.Errors);
			if(error.parent) this.Errors.push(error.parent.sqlMessage);
		}
	}


	async showData(){
		try {
			return await LOgin.findAll({
				attributes: ['username', 'userId', 'passwActive', 'textConfirm']
			});
		} catch (error) {
			this.Errors.push('Erro ao buscar os dados dos login');
			middleware.Errors.ErrorsSql(error, this.Errors);
			if(error.parent) this.Errors.push(error.parent.sqlMessage);
		}
	}


	async showOneData(obj){
		try {
			return await LOgin.findOne({
				where: obj
			});
		} catch (error) {
			this.Errors.push('Erro ao buscar os dados dos login');
			middleware.Errors.ErrorsSql(error, this.Errors);
			if(error.parent) this.Errors.push(error.parent.sqlMessage);
		}
	}
}

module.exports = Login;
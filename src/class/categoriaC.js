const valid = require('validator');
const Categorias = require('../models/outher/categorias');
const { ErrorsSql } = require('../shared/Errors');

class Categoria {

	constructor(){
		this.category;
		this.Errors = new Array();
	}

	cleanData(body){
		this.category = this.isVailid(body);
		return this.category;
	}

	isVailid(data){
		let existDesc = false;
		console.log(data);
		for (const da in data) {
			if(da == 'nameCategory'){
				if(!valid.isLength(data[da], {min: 4, max: 30})) this.Errors.push('nome da categoria deve conter no minímo 5 caracteres!!!');

				data[da] = data[da].toUpperCase();
			}

			if(`${da}` == 'description') existDesc = true;

			if(`${da}` == 'id')	return data;

			if(da == 'description'){
				if(valid.isEmpty(data[da])) this.Errors.push('descrição da categoria é obrigatória!!!');
			}
		}

		if(!existDesc) {
			let { nameCategory } = data;
			return { nameCategory };
		}

		let { nameCategory, description } = data;
		return { nameCategory, description };
	}

	async save (data) {
		try {
			return await Categorias.create(data);
		} catch (error) {
			this.Errors.push('erro ao salvar dados');
			ErrorsSql(error, this.Errors);
			ErrorsSql(error, this.Errors);
			if(error.parent) this.Errors.push(error.parent.sqlMessage);
		}
	}

	async showAll () {
		try {
			return await Categorias.findAll({
				attributes: ['nameCategory', 'description']
			});
		} catch (error) {
			this.Errors.push('Erro ao mostrar os dados');
			ErrorsSql(error, this.Errors);
			if(error.parent) this.Errors.push(error.parent.sqlMessage);
		}
	}

	async showOne (obj) {
		try {
			return await Categorias.findOne({where: obj, attributes: ['nameCategory', 'description']
			});
		} catch (error) {
			this.Errors.push('Erro ao trazer dados pesquisados');
			ErrorsSql(error, this.Errors);
			if(error.parent) this.Errors.push(error.parent.sqlMessage);
		}
	}

	async updated (oldObj, newObj) {
		try {
			return await Categorias.update(newObj, {where: oldObj});
		} catch (error) {
			this.Errors.push('Erro ao actualizar os dados');
			ErrorsSql(error, this.Errors);
			if(error.parent) this.Errors.push(error.parent.sqlMessage);
		}
	}
}

module.exports = new Categoria();

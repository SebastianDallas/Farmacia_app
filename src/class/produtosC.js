const Produtos = require('../models/outher/produtos');
const validator = require('validator');
const { ErrorsSql } = require('../shared/Errors');
const { organizaData } = require('../shared/functionsShared');
const categorias = require('../models/outher/categorias');

class Produto{
	constructor(){
		this.product;
		this.Errors = new Array();
	}

	cleanData(body){
		this.product = this.valid(body);

		return this.product;
	}

	valid(data){
		for (const key in data) {
			if(validator.isEmpty(data[key])) data[key] = '';

			if (key == 'name') {
				if(!validator.isLength(data[key], {min: 4, max: 50})) this.Errors.push('Name deve conter no minímo 5 caracteres!!!');

				data[key] = data[key].toUpperCase();
			}

			if (key == 'description') {
				if(!validator.isLength(data[key], {min: 15})) this.Errors.push('passe uma descrição bem objectiva e clara tendo no minimo 15 caracteres!!!');

				data[key] = data[key].toLowerCase();
			}

			if (key == 'codeBarra') {
				if(!validator.isLength(data[key], {min: 10})) this.Errors.push('passe o codigo de barra do produto!!!');

				data[key] = data[key].toLowerCase();
			}

			if (key == 'priceUnitary' && data[key]) {
				if(validator.isEmpty(data[key])) this.Errors.push('preço unitario é requerido!!!');
			}

			if (key == 'priceInbulk' && data[key]) {
				if(validator.isEmpty(data[key])) this.Errors.push('preço em bruto é requerido!!!');
			}

			if (key == 'currentStock' && data[key]) {
				if(validator.isEmpty(data[key])) this.Errors.push('quantos destes ainda temos no stocks!!!');
			}

			if (key == 'stockMin' && data[key]) {
				if(validator.isEmpty(data[key])) this.Errors.push('quantos destes ainda temos no stocks!!!');
			}

			if (key == 'categoriaId') {
				if(validator.isEmpty(data[key])) this.Errors.push('quantos destes ainda temos no stocks!!!');
				if(isNaN(data[key])) this.Errors.push('o id da categoria é requerido!!!');
			}

			if (key == 'validDate') {
				if(!data[key] && !validator.isLength(data[key], {min: 8, max: 10})) this.Errors.push(`digite uma data valida. ex: 02-10-1999 ${key}!!!`);

				let aux = data[key].split('-' || '.');
				let aux2 = aux.reverse();

				data[key] = aux2.join('-');
			}
		}

		return organizaData(data, ['name','description','priceUnitary','priceInbulk','currentStock','stockMin','codeBarra','categoriaId','validDate']);
	}

	async saveData(obj){
		try {
			await Produtos.create(obj);
		} catch (error) {
			this.Errors.push('Erro ao salvar os dados do Produto');
			ErrorsSql(error, this.Errors);
			if(error.parent) this.Errors.push(error.parent.sqlMessage);
		}
	}

	async updatadData(oldData, newData){
		try {
			return await Produtos.update(newData, {
				where: oldData
			});
		} catch (error) {
			this.Errors.push('Erro ao actualizar os dados do Produto');
			ErrorsSql(error, this.Errors);
			if(error.parent) this.Errors.push(error.parent.sqlMessage);
		}
	}

	async showData(){
		try {
			return await Produtos.findAll({
				attributes:  ['name','description','priceUnitary','priceInbulk','currentStock','stockMin','codeBarra','validDate'],
				include: [{model: categorias, attributes: ['nameCategory', 'description']}]
			});
		} catch (error) {
			this.Errors.push('Erro ao buscar os dados dos Produto');
			ErrorsSql(error, this.Errors);
			if(error.parent) this.Errors.push(error.parent.sqlMessage);
		}
	}
}

module.exports = Produto;
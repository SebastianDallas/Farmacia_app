const category = require('./controler_categorias');
const client = require('./controler_cliente');
const fornecedor = require('./controler_fornecedor');

const controllers = {
	categories: {...category},
	clientes: {...client},
	fornecedores: {...fornecedor},
};

module.exports = controllers;
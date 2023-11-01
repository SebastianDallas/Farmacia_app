const category = require('./controler_categorias');
const client = require('./controler_cliente');
const fornecedor = require('./controler_fornecedor');
const funcionario = require('./controler_funcionarios');
const product = require('./controler_produtos');

const controllers = {
	categories: {...category},
	clientes: {...client},
	fornecedores: {...fornecedor},
	funcionarios: {...funcionario},
	produtos: {...product}
};

module.exports = controllers;
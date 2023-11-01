const category = require('./controler_categorias');
const client = require('./controler_cliente');
const fornecedor = require('./controler_fornecedor');
const funcionario = require('./controler_funcionarios');
const product = require('./controler_produtos');
const log = require('./controler_login');



const controllers = {
	categories: {...category},
	clientes: {...client},
	fornecedores: {...fornecedor},
	funcionarios: {...funcionario},
	produtos: {...product},
	login: {...log}
};



module.exports = controllers;
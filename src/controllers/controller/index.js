const category = require('./contrroler_categorias');
const client = require('./contrroler_cliente');

const controllers = {
	categories: {...category},
	clientes: {...client}
};

module.exports = controllers;
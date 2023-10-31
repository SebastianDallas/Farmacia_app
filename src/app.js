const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const categorias = require('./routes/categoria');
const clientes = require('./routes/cliente');
const fornecedores = require('./routes/fornecedor');

class App {
	constructor(){
		this.app = express();
		this.middleware();
		this.routes();
	}

	middleware(){
		this.app.use(helmet());
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.urlencoded({extended: false}));
	}

	routes() {
		this.app.use('/categorias', categorias);
		this.app.use('/clientes', clientes);
		this.app.use('/fornecedores', fornecedores);
	}
}

module.exports = new App();
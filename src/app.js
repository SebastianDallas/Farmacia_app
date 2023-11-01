const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const other = require('./shared/middlewares/setAdmin');
const login = require('./routes/login');
const categorias = require('./routes/categoria');
const clientes = require('./routes/cliente');
const fornecedores = require('./routes/fornecedor');
const funcionarios = require('./routes/funcionario');
const produtos = require('./routes/produtos');

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
		this.app.use(other.admin);
	}

	routes() {
		this.app.use('/login', login);
		this.app.use('/categorias', categorias);
		this.app.use('/clientes', clientes);
		this.app.use('/fornecedores', fornecedores);
		this.app.use('/funcionarios', funcionarios);
		this.app.use('/produtos', produtos);
	}
}

module.exports = new App();
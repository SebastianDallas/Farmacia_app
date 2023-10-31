const { Router } = require('express');
const { controllers } = require('../controllers/main');
const route = Router();

route.get('/show',controllers.fornecedores.showAll);
// route.get('/showOne',controllers.fornecedores.showOne);
route.put('/updated',controllers.fornecedores.updateData);
route.post('/save',controllers.fornecedores.saveData);

module.exports = route;
const { Router } = require('express');
const { controllers } = require('../controllers/main');
const route = Router();

route.get('/show',controllers.clientes.showAll);
// route.get('/showOne',controllers.clientes.showOne);
route.put('/updated',controllers.clientes.updateData);
route.post('/save',controllers.clientes.saveData);

module.exports = route;
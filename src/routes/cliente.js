const { Router } = require('express');
const { controllers } = require('../controllers/main');
const route = Router();

// route.get('/show',controllers.clientes.showData);
// route.get('/showOne',controllers.clientes.showOne);
// route.put('/updated',controllers.clientes.update);
route.post('/save',controllers.clientes.saveData);

module.exports = route;
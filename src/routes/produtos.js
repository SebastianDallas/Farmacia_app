const { Router } = require('express');
const { controllers } = require('../controllers/main');
const route = Router();

route.get('/show',controllers.produtos.showAll);
// route.get('/showOne',controllers.produtos.showOne);
route.put('/updated',controllers.produtos.updateData);
route.post('/save',controllers.produtos.saveData);

module.exports = route;
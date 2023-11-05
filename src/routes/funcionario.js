const { Router } = require('express');
const { controllers } = require('../controllers/main');
const { middleware } = require('../shared');
const route = Router();

route.get('/show',middleware.VerifyJWT.token, controllers.funcionarios.showAll);
// route.get('/showOne',controllers.funcionarios.showOne);
route.put('/updated',controllers.funcionarios.updateData);
route.post('/save',controllers.funcionarios.saveData);

module.exports = route;
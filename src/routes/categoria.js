const { Router } = require('express');
const { controllers } = require('../controllers/main');
const route = Router();

route.get('/show',controllers.categories.showData);
route.get('/showOne',controllers.categories.showOne);
route.put('/updated',controllers.categories.update);
route.post('/save',controllers.categories.saveData);

module.exports = route;
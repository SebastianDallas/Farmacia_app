const { Router } = require('express');
const { controllers } = require('../controllers/main');
const route = Router();

route.post('/',controllers.login.Login);
route.post('/login/admin',controllers.login.ADMIN);
route.post('/register',controllers.login.Register);
route.get('/show',controllers.login.showAll);

module.exports = route;
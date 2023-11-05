const { Router } = require('express');
const { controllers } = require('../controllers/main');
const route = Router();

route.post('/',controllers.login.Login);
route.post('/login/admin',controllers.login.ADMIN);
// route.put('/register',controllers.login.updateData);

module.exports = route;
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { Errors_controllers } = require('./Errors');

exports.token = async (req, res, next) => {
	const token = req.headers['x-access-token'];

	if(token == undefined) return Errors_controllers(res, ['token é requerido!'], StatusCodes.BAD_REQUEST);

	jwt.verify(token, process.env.SECRET, (err, data)=> {
		if(err) return Errors_controllers(res, ['token invalido!', {err}], StatusCodes.BAD_REQUEST);

		res.locals.userOn = data;
    
		return next();
	});
};
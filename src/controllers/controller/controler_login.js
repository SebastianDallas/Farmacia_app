const Login = require('../../class/loginC');
const { StatusCodes } = require('http-status-codes');
const { middleware } = require('../../shared');
const other = require('../../models/outher/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.ADMIN = async (req, res)=>{
	const user = new Login();
	user.cleanData(req.body);

	const Other = await other.findOne({where: {
		username: user.login.username
	}});

	if(!Other || !bcrypt.compareSync(user.login.passw, Other.dataValues.passw)) return middleware.Errors.Errors_controllers(res, ['user and password don`t correct'], StatusCodes.CONFLICT);

	const token = jwt.sign({
		id: Other.dataValues.id,
		user: Other.dataValues.username,
		admin: Other.dataValues.is_admin
	}, process.env.SECRET, {
		expiresIn: 200
	});

	return res.status(StatusCodes.CREATED).json({token});

};

exports.Login = async (req, res)=>{
	const user = new Login();
	user.cleanData(req.body);

	const Other = await user.showOneData({username: user.login.username});

	console.log('\n\n',Other,'\n\n');

	if(!Other || !bcrypt.compareSync(user.login.passw, Other.dataValues.passwActive)) return middleware.Errors.Errors_controllers(res, ['user and password don`t correct'], StatusCodes.CONFLICT);

	const token = jwt.sign({
		id: Other.dataValues.id,
		user: Other.dataValues.username,
		admin: false
	}, process.env.SECRET, {
		expiresIn: 200
	});

	return res.status(StatusCodes.CREATED).json({token});
};

exports.Register = async (req, res)=>{
	const user = new Login();
	user.cleanData(req.body);

	if(middleware.Errors.Errors_controllers(res, user.Errors, StatusCodes.CONFLICT)) return;

	await user.Register(user.login);

	if(middleware.Errors.Errors_controllers(res, user.Errors, StatusCodes.CONFLICT)) return;

	res.status(StatusCodes.CREATED).json({info: 'login regitred with success'});
};

exports.showAll = async (req, res)=>{
	const user = new Login();

	const data = await user.showData();
	if(middleware.Errors.Errors_controllers(res, user.Errors, StatusCodes.CONFLICT)) return;

	if(middleware.Errors.Errors_controllers(res, user.Errors, StatusCodes.CONFLICT)) return;

	res.status(StatusCodes.CREATED).json({info: 'list Of login', data});
};

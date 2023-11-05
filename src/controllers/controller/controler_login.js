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

};

exports.Register = async (req, res)=>{


};

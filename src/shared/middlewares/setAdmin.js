require('dotenv').config();
const Admin = require('../../models/outher/admin');
const bcrypt = require('bcrypt');

const { USERNA, PASSW, ISADMIN } = process.env;

exports.admin = async (req, res, next) => {
	try {
		let user = await Admin.findOne({where: {
			username: USERNA,
		}});

		if(!user) {
			let pas =  bcrypt.hashSync(PASSW, 8);
			const obj = { username: USERNA, passw: pas, is_admin: ISADMIN };
			await Admin.create(obj);
		}
		return next();
	} catch (error) {
		console.log('Error in ADMIN\n\n', error);
	}
};
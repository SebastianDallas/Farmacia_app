const { StatusCodes: codes } = require('http-status-codes');
const Categoria = require('../../class/categoriaC');
const { Errors_controllers } = require('../../shared/Errors');

exports.saveData = async (req, res)=>{
	const data = Categoria.cleanData(req.body);

	if(Errors_controllers(res, Categoria.Errors, codes.CONFLICT)) return;

	await Categoria.save(data);

	if(Errors_controllers(res, Categoria.Errors, codes.CONFLICT)) return;

	return res.status(codes.CREATED).json({info: 'save with success'});
};


exports.showData = async (req, res)=>{
	let data = await Categoria.showAll();

	if(Errors_controllers(res, Categoria.Errors, codes.CONFLICT)) return;

	if(data.length === 0) return res.status(codes.ACCEPTED).json({info: 'get data in table Category', data: 'don`t have data'});

	return res.status(codes.ACCEPTED).json({info: 'get data in table Category', data});
};


exports.showOne = async (req, res)=>{
	let data = await Categoria.showOne(Categoria.cleanData(req.body));

	if(Errors_controllers(res, Categoria.Errors, codes.CONFLICT)) return;

	if(!data) return res.status(codes.ACCEPTED).json({info: 'get data in table Category', data: 'don`t have this data'});

	return res.status(codes.ACCEPTED).json({info: 'get data in table Category', data});
};


exports.update = async (req, res)=>{
	let old = Categoria.cleanData(req.query);
	let New = Categoria.cleanData(req.body);

	if(Errors_controllers(res, Categoria.Errors, codes.CONFLICT)) return;

	let hasUpdated = await Categoria.updated(old, New);

	if(Errors_controllers(res, Categoria.Errors, codes.CONFLICT)) return;

	if(hasUpdated[0] == 0) return res.status(codes.ACCEPTED).json({info: 'updated data in table Category', old, moreInfo: 'data not found'});

	return res.status(codes.ACCEPTED).json({info: 'updated data in table Category', old});
};


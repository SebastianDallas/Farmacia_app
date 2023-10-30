const { StatusCodes: codes } = require('http-status-codes');
const Categoria = require('../../class/categoriaC');

exports.saveData = async (req, res)=>{
	const data = Categoria.cleanData(req.body);

	if(Categoria.Errors.length > 0)
		return res.status(codes.CONFLICT).json({Erros: Categoria.Errors});

	await Categoria.save(data);

	if(Categoria.Errors.length > 0)
		return res.status(codes.CONFLICT).json({Erros: Categoria.Errors});

	return res.status(codes.CREATED).json({info: 'save with success'});
};


exports.showData = async (req, res)=>{
	let data = await Categoria.showAll();

	if(Categoria.Errors.length > 0)
		return res.status(codes.CONFLICT).json({Erros: Categoria.Errors});

	if(data.length === 0) return res.status(codes.ACCEPTED).json({info: 'get data in table Category', data: 'don`t have data'});

	return res.status(codes.ACCEPTED).json({info: 'get data in table Category', data});
};


exports.showOne = async (req, res)=>{
	let data = await Categoria.showOne(Categoria.cleanData(req.body));

	if(Categoria.Errors.length > 0)
		return res.status(codes.CONFLICT).json({Erros: Categoria.Errors});

	if(!data) return res.status(codes.ACCEPTED).json({info: 'get data in table Category', data: 'don`t have this data'});

	return res.status(codes.ACCEPTED).json({info: 'get data in table Category', data});
};


exports.update = async (req, res)=>{
	let old = Categoria.cleanData(req.query);
	let New = Categoria.cleanData(req.body);

	if(Categoria.Errors.length > 0)
		return res.status(codes.CONFLICT).json({Erros: Categoria.Errors});

	let hasUpdated = await Categoria.updated(old, New);

	if(Categoria.Errors.length > 0)
		return res.status(codes.CONFLICT).json({Erros: Categoria.Errors});

	if(hasUpdated[0] == 0) return res.status(codes.ACCEPTED).json({info: 'updated data in table Category', old, moreInfo: 'data not found'});

	return res.status(codes.ACCEPTED).json({info: 'updated data in table Category', old});
};


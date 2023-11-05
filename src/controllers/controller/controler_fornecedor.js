const Fornecedor = require('../../class/fornecedorC');
const { StatusCodes } = require('http-status-codes');
const { middleware } = require('../../shared');

exports.saveData = async (req, res)=>{
	const fornecedor = new Fornecedor();
	fornecedor.cleanData(req.body);

	if(middleware.Errors.Errors_controllers(res, fornecedor.Errors, StatusCodes.CONFLICT)) return;

	await fornecedor.saveData(fornecedor.fornecedores);

	if(middleware.Errors.Errors_controllers(res, fornecedor.Errors, StatusCodes.CONFLICT)) return;

	return res.status(StatusCodes.CREATED).json({ info: 'fornecedor save with success', data: fornecedor.fornecedores });

};

exports.updateData = async (req, res)=>{
	const fornecedor = new Fornecedor();

	fornecedor.cleanData(req.query);
	let oldData = fornecedor.fornecedores;

	fornecedor.cleanData(req.body);
	let newData = fornecedor.fornecedores;

	let response = await fornecedor.updatadData(oldData, newData);

	if(middleware.Errors.Errors_controllers(res, fornecedor.Errors, StatusCodes.CONFLICT)) return;

	if(response[0] == 0) return res.status(StatusCodes.BAD_REQUEST).json({info: 'don`t exist this data'});

	return res.status(StatusCodes.CREATED).json({ info: 'fornecedor updated with success' });
};

exports.showAll = async (req, res)=>{
	const fornecedor = new Fornecedor();

	let response = await fornecedor.showData();

	if(middleware.Errors.Errors_controllers(res, fornecedor.Errors, StatusCodes.CONFLICT)) return;

	if(response.length == 0) return res.status(StatusCodes.BAD_REQUEST).json({info: 'don`t exist this data'});

	return res.status(StatusCodes.CREATED).json({ info: 'get fornecedor list', list: response});
};
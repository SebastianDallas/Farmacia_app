const Fornecedor = require('../../class/funcionarioC');
const { StatusCodes } = require('http-status-codes');
const { Errors_controllers } = require('../../shared/Errors');

exports.saveData = async (req, res)=>{
	const fornecedor = new Fornecedor();
	fornecedor.cleanData(req.body);

	if(Errors_controllers(res, fornecedor.Errors, StatusCodes.CONFLICT)) return;

	console.log('\n\n\n\n',fornecedor.funcionary, '\n\n\n\n\n');
	await fornecedor.saveData(fornecedor.funcionary);

	if(Errors_controllers(res, fornecedor.Errors, StatusCodes.CONFLICT)) return;

	return res.status(StatusCodes.CREATED).json({ info: 'fornecedor save with success', data: fornecedor.funcionary });

};

exports.updateData = async (req, res)=>{
	const fornecedor = new Fornecedor();

	fornecedor.cleanData(req.query);
	let oldData = fornecedor.funcionary;

	fornecedor.cleanData(req.body);
	let newData = fornecedor.funcionary;

	let response = await fornecedor.updatadData(oldData, newData);

	if(Errors_controllers(res, fornecedor.Errors, StatusCodes.CONFLICT)) return;

	if(response[0] == 0) return res.status(StatusCodes.BAD_REQUEST).json({info: 'don`t exist this data'});

	return res.status(StatusCodes.CREATED).json({ info: 'fornecedor updated with success' });
};

exports.showAll = async (req, res)=>{
	const fornecedor = new Fornecedor();

	let response = await fornecedor.showData();

	if(Errors_controllers(res, fornecedor.Errors, StatusCodes.CONFLICT)) return;

	if(response.length == 0) return res.status(StatusCodes.BAD_REQUEST).json({info: 'don`t exist this data'});

	return res.status(StatusCodes.CREATED).json({ info: 'get fornecedor list', list: response});
};
const Cliente = require('../../class/clienteC');
const { StatusCodes } = require('http-status-codes');
const { Errors } = require('../../shared/Errors');

exports.saveData = async (req, res)=>{
	const client = new Cliente();
	client.cleanData(req.body);

	if(Errors(res, client.Errors, StatusCodes.CONFLICT)) return;

	await client.saveData(client.clientes);

	if(Errors(res, client.Errors, StatusCodes.CONFLICT)) return;

	return res.status(StatusCodes.CREATED).json({ info: 'cliant save with success', data: client.clientes });

};

exports.updateData = async (req, res)=>{
	const client = new Cliente();
	let oldData = req.query;
	let newData = req.body;

	let response = await client.updatadData(oldData, newData);

	if(Errors(res, client.Errors, StatusCodes.CONFLICT)) return;

	if(response[0] == 0) return res.status(StatusCodes.BAD_REQUEST).json({info: 'don`t exist this data'});

	return res.status(StatusCodes.CREATED).json({ info: 'cliant updated with success' });
};

exports.showAll = async (req, res)=>{
	const client = new Cliente();

	let response = await client.showData();

	if(Errors(res, client.Errors, StatusCodes.CONFLICT)) return;

	if(response.length == 0) return res.status(StatusCodes.BAD_REQUEST).json({info: 'don`t exist this data'});

	return res.status(StatusCodes.CREATED).json({ info: 'get cliant list', list: response});
};
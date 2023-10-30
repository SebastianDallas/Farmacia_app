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
  
};
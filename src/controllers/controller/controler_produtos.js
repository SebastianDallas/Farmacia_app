const Produto = require('../../class/produtosC');
const { StatusCodes } = require('http-status-codes');
const { middleware } = require('../../shared');

exports.saveData = async (req, res)=>{
	const produto = new Produto();
	produto.cleanData(req.body);

	if(middleware.Errors.Errors_controllers(res, produto.Errors, StatusCodes.CONFLICT)) return;

	await produto.saveData(produto.product);

	if(middleware.Errors.Errors_controllers(res, produto.Errors, StatusCodes.CONFLICT)) return;

	return res.status(StatusCodes.CREATED).json({ info: 'produto save with success', data: produto.product });

};

exports.updateData = async (req, res)=>{
	const produto = new Produto();

	produto.cleanData(req.query);
	let oldData = produto.product;

	produto.cleanData(req.body);
	let newData = produto.product;

	let response = await produto.updatadData(oldData, newData);

	if(middleware.Errors.Errors_controllers(res, produto.Errors, StatusCodes.CONFLICT)) return;

	if(response[0] == 0) return res.status(StatusCodes.BAD_REQUEST).json({info: 'don`t exist this data'});

	return res.status(StatusCodes.CREATED).json({ info: 'produto updated with success' });
};

exports.showAll = async (req, res)=>{
	const produto = new Produto();

	let response = await produto.showData();

	if(middleware.Errors.Errors_controllers(res, produto.Errors, StatusCodes.CONFLICT)) return;

	if(response.length == 0) return res.status(StatusCodes.BAD_REQUEST).json({info: 'don`t exist this data'});

	return res.status(StatusCodes.CREATED).json({ info: 'get produto list', list: response});
};
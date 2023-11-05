exports.Errors_controllers = (res, arrayErrors, status, )=>{
	let aux = false;

	if(arrayErrors.length > 0){
		res.status(status).json({ Errors: arrayErrors });
		aux = true;
	}

	return aux;
};

exports.ErrorsSql = (error, variableError)=>{
	if(error.errors) error.errors.forEach(er => {
		variableError.push(er.message);
	});
};

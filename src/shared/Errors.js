exports.Errors = (res, arrayErrors, status, )=>{
	let aux = false;

	if(arrayErrors.length > 0){
		res.status(status).json({ Errors: arrayErrors });
		aux = true;
	}

	return aux;
};
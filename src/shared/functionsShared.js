exports.organizaData = (data, arrayAtributes) => {
	let obj = {};

	for (const key in data) {
		if(arrayAtributes.indexOf(`${key}` !== -1)) obj[key] = data[key];
	}

	return obj;
};
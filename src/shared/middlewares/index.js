const Err = require('./Errors');
const ADMIN = require('./setAdmin');
const FuncInterm = require('./functionsShared');
const tok = require('./tokenVerify');

const middleware = {
	Errors: {...Err},
	Other: {...ADMIN},
	otherFunc: {...FuncInterm},
	VerifyJWT: {...tok}
};


module.exports = middleware;
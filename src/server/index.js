const App = require('../app.js');
const db = require('../models/index.js');
const PORT = process.env.PORT || 3030;

db.authenticate().then(()=>{

	console.log('database connected with success');
	App.app.emit('ligado');

}).catch((err)=>{
	console.log('\n\nErro ao connectar database\n\n', err);
});

App.app.on('ligado', ()=>{
	App.app.listen(PORT, ()=>{
		console.log('server On');
	});
});
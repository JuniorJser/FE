var c6module = require('./c6-module.js');
c6module(process.argv[2], process.argv[3], function(err, data){
	if(err){
		console.log(err);
	}else{
		data.forEach(function(item){
			console.log(item);
		});
	}
});
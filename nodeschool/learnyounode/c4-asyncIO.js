var fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function(err, data){
	if(data){
		console.log(data.split('\n').length - 1);
	}else{
		console.log(err);
	}
});
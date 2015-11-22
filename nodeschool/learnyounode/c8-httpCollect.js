var bl = require('bl');//buffer list
var http =require('http');
http.get(process.argv[2], function(response){
	response.pipe(bl(function(err, data){
		if(err)
			return console.error(err);
		var s = data.toString();
		console.log(s.length);
		console.log(s);
	}));
});
var q = require('q');

function parsePromised(){
	var defer = q.defer(), json;
	try{
		json = JSON.parse(process.argv[2]);
	}catch(e){
		defer.reject(e);
	}
	defer.resolve(json);
	return defer.promise;
}

parsePromised().then(console.log, console.log);
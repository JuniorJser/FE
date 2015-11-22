var q = require('q');
var defer = q.defer();

function errHandler(err){
	console.log(err.message);
}

defer.promise.then(null, errHandler);
setTimeout(defer.reject, 300, new Error('REJECTED!'));
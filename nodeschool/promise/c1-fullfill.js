var q = require('q');
var defer =  q.defer();
var async = function(){
	setTimeout(defer.resolve('RESOLVED!'), 300);
	return defer.promise;
}
async().then(console.log);
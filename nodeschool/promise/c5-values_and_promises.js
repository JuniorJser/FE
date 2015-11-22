var q = require('q');
var defer = q.defer();
function attachTitle(t){
	return 'DR. ' + t;
}
defer.promise.then(attachTitle).then(console.log);
defer.resolve('MANHATTAN');
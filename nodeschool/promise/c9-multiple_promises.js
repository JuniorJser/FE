var q = require('q');
var defer1 = q.defer();
var defer2 = q.defer();
function all(prom1, prom2){
	var _def = q.defer(),
		counter = 0,
		arr = [];
	prom1
	.then(function(a){
		counter++;
		arr[counter - 1] = a;
		if(counter == 2){
			_def.resolve(arr);
		}
	})
	.then(null, _def.reject)
	.done();

	prom2
	.then(function(b){
		counter++;
		arr[counter - 1] = b;
		if(counter == 2){
			_def.resolve(arr);
		}
	})
	.then(null, _def.reject)
	.done();
	return _def.promise;
}

all(defer1.promise, defer2.promise)
.then(console.log)
.done();
/*
q.all([defer1.promise, defer2.promise])
.then(console.log)
.done();
*/

/*
q.spread([defer1.promise, defer2.promise], console.log)
.done();
*/
setTimeout(function(){
	defer1.resolve('PROMISES');
	defer2.resolve('FTW');
}, 200);
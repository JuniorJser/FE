var http = require('http');
var bl = require('bl');
var list = [];
var count = 0;
//异步队列，用计数的方式解决
function print(list){
	for(var i = 0; i < 3; i++){
		console.log(list[i]);
	}
}

function httpGet(index){
	http.get(process.argv[2 + index], function(response){
		response.pipe(bl(function(err, data){
			list[index] = data.toString();
			count++;
			count == 3 && print(list);
		}));
	});
}

for(var i = 0; i < 3; i++){
	httpGet(i);
}



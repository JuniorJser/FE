var q_http = require('q-io/http');

q_http.read('http://localhost:7000')
.then(function(json){
	return q_http.read('http://localhost:7001/' + json.toString());
})
.then(function(json){
	console.log(JSON.parse(json));
})
.then(null, console.err)
.done();

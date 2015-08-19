//作为server
var http = require('http');

http.createServer(function(request, response) {

	response.writeHead(200, {'Content-Type':'text-plain'});

	request.on('data', function(chunk) {
		response.write(chunk);
	});

	request.on('end', function() {
		response.end();
	});

}).listen(8124);

//作为client
var options = {
	hostname: 'www.example.com',
	port: 80,
	path: '/upload',
	method: 'POST',
	headers: {
		'Content-Type':'application/x-www-form-urlencoded'
	}
};

var request = http.request(options, function(response) {});

request.write('Hello World');
request.end();

//GET请求的便捷API
//http.get('http://www.example.com/', function(response) {});
//
//一个例子
http.get('http://www.example.com/', function(response) {
	var body = [];
	console.log(response.statusCode);
	console.log(response.headers);

	response.on('data', function(chunk) {
		body.push(chunk);
	});

	response.on('end', function() {
		body = Buffer.concat(body);
		console.log(body.toString());
	});
});

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

//https server

//key和cert字段指定了HTTPS服务器使用的私钥和公钥
var options = {
	key:fs.readFileSync('./ssl/default.key'),
	cert:fs.readFileSync('./ssl/default.cer'),
	//该字段用于禁用对证书有效性的检查
	//从而允许https模块请求开发环境下使用自制证书的HTTPS服务器
	rejectUnauthorized:false
};

var server = https.createServer(options, function(request, response)) {
	//.....
});

//向https服务器添加证书
server.addContext('foo.com',{
	key: fs.readFileSync('./ssl/foo.com.key'),
	cert: fs.readFileSync('./ssl/foo.com.cer')
});

//url,记得去看parse和querystring的源码
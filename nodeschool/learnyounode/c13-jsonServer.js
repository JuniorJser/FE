var http = require('http');
var url = require('url');

var server = http.createServer(function(req, res){
	var s = url.parse(req.url, true);
	var d,json;
	if(/^\/api\/parsetime/.test(s.pathname)){
		d = new Date(s.query['iso']);
		json = {"hour":d.getHours(),
					"minute":d.getMinutes(),
					"second":d.getSeconds()};
	}
	if(/^\/api\/unixtime/.test(s.pathname)){
		d = new Date(s.query['iso']);
		d = d.getTime();
		json = {'unixtime':d};
	}
	res.writeHead(200, {'content-type':'application/json'});
	res.end(JSON.stringify(json));
});
server.listen(Number(process.argv[2]));
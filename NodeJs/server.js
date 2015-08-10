var http = require("http");
var url = require("url");

function start(route, handle){
	//作为一个模块
	function onRequest(request,response){
		var pathname = url.parse(request.url).pathname;
		console.log("Request for "+pathname+" received.");
		route(handle, pathname, response, request);
	}

	//创建一个http服务器并监听8083端口
	http.createServer(onRequest).listen(8083);
	console.log("Server has started!");
}
//导出模块
exports.start = start;
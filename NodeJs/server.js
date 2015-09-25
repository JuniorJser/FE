var http = require("http");
var url = require("url");

function start(route, handle){
	//作为一个模块
	function onRequest(request,response){
		var pathname = url.parse(request.url).pathname;
		console.log("Request for "+pathname+" received.");
		request.addListener('data', function(chunk){
			console.log("received chunk");
		});
		route(handle, pathname, response, request);
	}

	//创建一个http服务器并监听8088端口
	http.createServer(onRequest).listen(8088);
	console.log("Server has started!");
}
//导出模块
exports.start = start;
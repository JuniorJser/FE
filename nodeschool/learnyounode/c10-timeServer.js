var net  = require('net');

var format = function(time){
	return (time<10?'0':'') + time;
}

var getNow = function(){
	var date = new Date();
	return date.getFullYear() + '-'
			   + format(date.getMonth()+1) +'-'
			   + format(date.getDate()) +' '
			   + format(date.getHours()) + ':'
			   + format(date.getMinutes());
}
var server = net.createServer(function(socket){
	socket.end(getNow()+'\n');
});
server.listen(Number(process.argv[2]));

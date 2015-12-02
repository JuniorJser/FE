var through = require("through2");
var http = require("http");

var server = http.createServer(function(req, res){
    if(req.method === "POST"){
        req.pipe(through(write, end)).pipe(res);
    }
});

function write(buf, _, next){
    this.push(buf.toString().toUpperCase());
    next();
}
function end(done){
    done();
}
server.listen(process.argv[2]);
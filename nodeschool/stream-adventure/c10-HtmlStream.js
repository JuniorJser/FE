var trumpet = require('trumpet');
var tr = trumpet();
var through = require("through2");
var ts = tr.select('.loud').createStream();

ts.pipe(through(function(buf, _, next){
    this.push(buf.toString().toUpperCase());
    next();
})).pipe(ts);

process.stdin.pipe(tr).pipe(process.stdout);
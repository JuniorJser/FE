var through = require("through2");
var split = require("split");
var i = 0;
process.stdin
    .pipe(split())
    .pipe(through(function(line, _, next){
        ++i % 2 == 0 ? this.push(line.toString().toUpperCase()+'\n')
            :this.push(line.toString().toLowerCase()+'\n');
        next();
    }))
    .pipe(process.stdout);
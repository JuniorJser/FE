var spawn = require('child_process').spawn;
var duplexer = require('duplexer');

module.exports = function (cmd, args){
    var process_1 = spawn(cmd, args);
    var dup = duplexer(process_1.stdin, process_1.stdout);
    return dup;
}
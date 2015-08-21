var util = require('util');

//nodejs标准输入流stdin，标准输出流stdout，标准错误流stderr
function log() {
	process.stdout.write(
		util.format.apply(util, arguments) + '\n');
}
log(process.argv.slice(2));

//创建子进程,
var child = child_process.spawn('node',['xxx.js']);
//spawn方法支持三个参数
//第一个参数是执行文件路径
//第二个参数中数组中的每个成员都按顺序对应一个命令行参数
//第三个参数可选，用于配置子进程的执行环境与行为

//nodejs进程间的相互通信可以用IPC
//parent.js
var child =child.process.spawn('node', ['child.js'], {
	stdio:[0, 1, 2, 'ipc']
});

child.on('message', function(msg) {
	console.log(msg);
});

child.send({hello:'hello'});

//child.js
process.on('message', function(msg) {
	msg.hello = msg.hello.toUpperCase();
	process.send(msg);
});


//守护子进程
//daemon.js
function spawn(mainModule) {
	var worker = child_process.spawn('node', [ mainModule ]);

	worker.on('exit', function(code) {
		if(code !== 0) {
			spawn(mainModule);
		}
	});
}

spawn('worker.js');
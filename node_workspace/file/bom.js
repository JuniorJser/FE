//去掉utf-8的bom头
function readText(pathname) {
	var bin = fs.readFileSync(pathname);

	if(bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
		bin = bin.slice(3);
	}

	return bin.toString('utf-8');
}

//GBK编码可以通过iconv-lite这个三方包来完成。
//使用方式
var iconv = require('iconv-lite');

function readGBKText(pathname) {
	var bin = fs.readFileSync(pathname);
	  
	return iconv.decode(bin, 'gbk');
}


//单字节编码诀窍：
//不管大于0xEF的单个字节在单字节编码下被解析成什么乱码字符，
//使用同样的单字节编码保存这些乱码字符时，
//背后对应的字节保持不变
function replace(pathname) {
	var str = fs.readFileSync(pathname, 'binary');
	str = str.replace('foo', 'bar');
	fs.writeFileSync(pathname, str, 'binary');
}

// 学好文件操作，编写各种程序都不怕。

// 不要使用拼接字符串的方式来处理路径，使用path模块。

// 掌握好目录遍历和文件编码处理技巧，很实用。
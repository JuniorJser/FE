title: js模板引擎
date: 2015-10-14 16:48:00
tags:[javascript, template]
---
人类的进步源于好奇 --Tinker.吐温
===
用了很久html模版，突然想知道它是怎么实现的，于是学习开始了。
---
最直观的思路，用正则匹配然后替换，但是无法处理更“复杂”一点的模板，比如<%name.first%>，for循环等
	var tpl = 'Hei, my name is <%name%>, and I\'m <%age%> years old.';
	var data = {name:'zhangting', age:'22'};
	var result = tpl.replace(/<%([^%>]+)%>/g, function(s0, s1){
		return data[s1];//data['name.first']显然是不行的
	});

尝试把逻辑部分和非逻辑部分连接成字符串，并通过new Function的方式直接编译
---
	Function构造函数：用于创建一个函数，最后一个参数是函数的body，前面的参数都是arguments
	var fn = new Function("data","var arr = []; for(var i in data){ arr.push(data[i]); } return arr.join(' ')");
	fn({"name": "zhangting", "age": "22"});//zhangting22

	var reg = /<%([^%>]+)?%>/g;
	var tpl = 'Hei, my name is <%name%>, and I\'m <%age%> years old.';
	var match;*/

exec函数，正则带g的时候，起始位置受lastIndex属性影响，单次匹配返回一个数组，下标0为匹配到的串，下标1到n为子表达式（如果有的话），index表示匹配到的序号，input表示原来的串，可重复匹配来获取所有要匹配的文本
---
	while( match = reg.exec(tpl) ){
		console.log(match);
	};
	var tpl = "<%for(var i = 0; i<2; i++){if(i==1){console.log('1 is break');break;}%>Hei, my name is <%name%>, and I am <%age%> years old.<%}%>";
	var data = {name:"zhangting",age:"22"};
	var tplEngine = function(tpl, data){
		var reg = /<%([^%>]+)?%>/g,//提取
			isJs = /^\s*(if|else|for|switch|case|break|{|})/g,//判断是否为代码
			code = 'var arr = [];',//用于编译的函数体
			cursor = 0,//定位
			match;

		var compile = function(line, js){
			js ? code += line.match(isJs) ? line+";" : 'arr.push(this.'+ line +');'
			//是js则直接加入code，不是js（一般也即变量）则不转义双引号push进arr数组，这里用了this.xxx便于之后的数据传入
				:code += line!='' ? 'arr.push("'+ line.replace(/"/g, '\\"') +'");' : '';
				//非逻辑部分转义双引号，防止push(abc)这样的情况出现，line为空不push进arr数组
		};

		while(match = reg.exec(tpl)){
			compile(tpl.slice(cursor, match.index), false);//添加非逻辑部分
			compile(match[1], true);//添加逻辑部分
			cursor = match.index + match[0].length;
		}

		compile(tpl.slice(cursor, tpl.length - cursor));//添加非逻辑的最后一部分

		code += 'return arr.join("");';//返回结果，拿到装入数组的代码

		return new Function(code).apply(data);//调用Function构造函数编译提取好的代码
	};

	console.log(tplEngine(tpl, data));

/*
* util.js
* Author: Tinker
* Issue: Baidu IFE
* description: some practices
*/

//是否为Array
function isArray(obj){
	return Object.prototype.toString.call(obj) === "[Object Array]";
};

//是否为Object
function isObject(obj){
	return Object.prototype.toString.call(obj) === "[Object Object]";
};

//是否为function
function isFunction(obj){
	return Object.prototype.toString.call(obj) === "[Object Function]";
};

//深度克隆对象
function cloneObject(obj){
	var tmp = {};
	for(var a in obj){
		//是数组则一一复制
		if(isArray(obj[a])){
			tmp[a] = [];
			for(var i=0; i<obj[a].length; i++)
				tmp.push(obj[a][i]);
		}
		//是对象则递归调用
		else if(isObject(obj[a])){
			tmp[a] = arguments.callee(obj[a]);
		}
		else{
			tmp[a] = obj[a];
		}
	}
	return tmp;
};

//对数组进行去重，只考虑元素为数字或者字符串
function uniqArray(arr){
	var tmp = {}, arr2 = [];
	for(var i=0; i<arr.length; i++){
		if(tmp[arr[i]]){
			continue;
		}
		else{
			tmp[arr[i]] = 1;
			arr2.push(arr[i]);
		}
	}
	return arr2;
};

//字符串去空格
function trim(str){
	return str.replace(/\s*/g , "");
}




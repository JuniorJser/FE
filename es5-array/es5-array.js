//ES5中Array方法及其兼容IE的扩展
//Ps:经过少量测试,仅作为学习使用

//forEach
//param:
//  function(value, index, array)
//  [,thisobject]
[1,2,3,4].forEach(function(value, index, array){
	console.log(value+' '+index+' '+array);
});

//IE6-8扩展
if(typeof Array.prototype.forEach != "function"){
	Array.prototype.forEach = function(fn, context){
		if(typeof fn == "function"){
			for(var i = 0, len = this.length; i<len; i++){
				fn.call(context, this[i], i, this);
			}
		}
	};
}

//map
//param:
//  function(value, index, array)
//  [,thisobject]
var arr = [1,2,3,4].map(function(value, index, array){
	return value*value;//[1,4,9,16],必须有return不然就是undefined
});

//IE6-8扩展
if(typeof Array.prototype.map != "function"){
	Array.prototype.map = function(fn, context){
		var arr = [];
		if(typeof fn == "function"){
			for(var i = 0, len = this.length; i<len; i++){
				arr.push(fn.call(context, this[i], i, this));
			}
		}
		return arr;
	};
}

//filter
//param:
//	function(value, index, array)
//	[,thisobject]
[1,2,3,4].filter(function(value, index, array){
	return value > 2;//[3,4]
});

//IE6-8扩展
if(typeof Array.prototype.filter != "function"){
	Array.prototype.filter = function(fn, context){
		var arr = [];
		if(typeof fn == "function"){
			for(var i = 0, len = this.length; i<len; i++){
				fn.call(context, this[i], i, this) && arr.push[this[i]];
			}
		}
		return arr;
	}
}

//some
//param:
//	function(value, index, array)
//	[, thisobject]
[1,2,3,4].some(function(value, index, array){
	return value>2;//只要有一项大于2就不再继续判断
});

//IE6-8
if(typeof Array.prototype.some != "function"){
	Array.prototype.some = function(fn, context){
		var bool = false;
		if(typeof fn == "function"){
			for(var i = 0, len = this.length; i<len; i++){
				if(bool == true){
					break;
				}
				bool = !!fn.call(context, this[i], i, this);
			}
		}
		return bool;
	}
}

//every
//param:
//	function(value, index, array)
//	[,thisobject]
[1,2,3,4].every(function(value, index, array){
	return value>1;
});

//IE6-8
if(typeof Array.prototype.every != "function"){
	Array.prototype.every = function(fn, context){
		var bool = true;
		if(typeof fn == "function"){
			for(var i = 0, len = this.length; i<len; i++){
				if(bool == false){
					break;
				}
				bool = !!fn.call(context, this[i], i, this);
			}
		}
		return bool;
	}
}

//indexOf
//param:
//	searchElement
//	[, fromIndex]
[1,2,3,4].indexOf("2", 0);//-1，找不到，因为是严格匹配 ===
[1,2,3,4].indexOf(2, "0");//1，找到了，index可以是字符串数值

//IE6-8扩展
if(typeof Array.prototype.indexOf != "function"){
	Array.prototype.indexOf = function(searchElement, fromIndex){
		var index = -1;
		fromIndex = +fromIndex || 0;
		for (var i = fromIndex, len = this.length; i<len; i++){
			if(this[i] === searchElement){
				index = i;
				break;
			}
		}
		return index;
	}
}

//lastIndexOf
//param:
//	searchElement
//	[, fromIndex]
[1,2,3,4].lastIndexOf(1,3);
//和indexOf的区别在于从末尾开始找，而不是开头，fromIndex的默认值是array.length-1

//IE6-8
if(typeof Array.prototype.lastIndexOf != "function"){
	Array.prototype.lastIndexOf = function(searchElement, fromIndex){
		var index = -1, len = this.length-1;
		fromIndex = +fromIndex || len;
		for(var i = fromIndex; i>-1; i--){
			if(this[i] === searchElement){
				index = i;
				break;
			}
		} 
		return index;
	};
}

//reduce
//param:
//	function(pre, cur, index, array) pre表示前一个值，cur表示当前值
//	[, initValue] 表示pre的初始值
[1,2,3,4].reduce(function(pre, cur, index, array){
	return pre + cur;
});

//二维数组扁平化的一个简单例子
[1,[2,3,4],[5,6]].reduce(function(pre, cur, index, array){
	if(!(pre instanceof Array)){
		var arr = [];
		arr.push(pre);
		pre = arr;
	}
	return pre.concat(cur);
});

//IE6-8扩展
if(typeof Array.prototype.reduce != "function"){
	Array.prototype.reduce = function(fn, initValue){
		var i = 1, pre = this[0];
		if (!!initValue) {
			pre = initValue;
			i = 0;
		}
		if(typeof fn == "function"){
			for(len = this.length; i<len; i++)
				pre = fn(pre, this[i], i, this);
		}
		return pre;
	};
}

/*
* util.js
* Author: Tinker
* Issue: Baidu IFE
* description: a small function library
*/

//调试输出
function print(a){
	console.log(a);
};

//是否为Array
function isArray(obj){
	return Object.prototype.toString.call(obj) === "[object Array]";
};

//是否为纯对象，即是否为{}或者new Object()方式创建
function isPlain(obj){
	var key, 
		hasOwnProperty = Object.prototype.hasOwnProperty;
	if( !obj || 
		//IE下，window/document/document.body/HTMLElement/HTMLCollection/NodeList等DOM对象为true
		Object.prototype.toString.call(obj) === "[object Object]" ||
		//一般直接用这个办法
		!('isPrototypeOf' in obj)
		//isPrototypeOf是挂在Object.prototype上的，任何字面量都应该有
	) {
		return false;
	}
	//判断是否为new Obejct()的方式创建的对象
	if( obj.constructor && //由构造函数创建的都有constructor属性
		!hasOwnProperty.call(obj, constructor) && //constructor默认应该是非继承属性
		!hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf') //构造函数的原型应该有Object对象的特有属性isPrototypeOf
		){
		return false;
	}

	//判断是否有继承，只要存在一项继承属性则不纯
	//for in循环先遍历非继承属性
	//为了加速，直接跳到最后一项判断是否为自有属性
	for(key in obj){}
	return key === undefined || hasOwnProperty.call(obj, key);
};

//是否为function
function isFunction(obj){
	return Object.prototype.toString.call(obj) === "[object Function]";
};

//递归实现深度克隆对象
//数据类型限制为：数字、字符串、布尔、日期、数组、Object对象
function cloneObject(obj){
	var result = obj, i, len;
	if( !obj ||
		obj instanceof String ||
		obj instanceof Boolean ||
		obj instanceof Number ){
		return result;
	}
	else if(isArray(obj)){
		var resultlen = 0;
		result = [];
		for(i=0; i<len; i++){
			result[resultlen++] = cloneObject(obj[i]);
		}
	}
	else if(isPlain(obj)){
		result = {};
		for(i in obj){
			if(obj.hasOwnProperty(i)){
				result[i] = cloneObject(obj[i]);
			}
		}
	}
	return result;
};

//对数组进行去重，只考虑元素为数字或者字符串
//hash
function uniqArray(arr){
	var tmp = {}, arr2 = [];
	for(var i=0, len=arr.length; i<len; i++){
		if(!tmp[arr[i]]){
			tmp[arr[i]] = true;
			arr2.push(arr[i]);
		}
	}
	return arr2;
};

//hash+es5
function uniqArray2(arr){
	var tmp={};
	for(var i=0, len=arr.length; i<len; i++){
		tmp[arr[i]] = true;
	}
	return Object.keys(tmp);
};

//字符串首尾去空格
function trim(str){
	return String(str).replace(/^\s+|\s+$/g , '');
};

//遍历数组，对每个元素执行fn
function each(arr, fn){
	for(var i=0, len=arr.length; i<len; i++)
		fn(arr[i], i);
};

//获取对象第一层元素的数量
//IE9存在一个BUG，自定义属性名和不可枚举属性重名时，自定义属性无法通过for in找出来。
var getObjectLength = (function(){
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty,
		//是否有IE9不可枚举的BUG
		hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
		//不可枚举的属性
		dontEnums = [
			'toString',
			'toLocaleString',
			'valueOf',
			'hasOwnProperty',
			'isPrototypeOf',
			'propertyIsEnumerable',
			'constructor'
		],
		dontEnumsLength = dontEnums.length;
		return function(obj){
			//判断是否为广义对象
			if(typeof obj !== 'Object' && (typeof obj !== 'Function' || obj === null)){
				throw new TypeError("getObjectLength called on non-object");
			}
			var result = [],
				prop, i;
			//先把可枚举的存入
			for(prop in obj){
				if(hasOwnProperty.call(obj, prop)){
					result.push(prop);
				}
			}
			//存入有不可枚举BUG的自有属性
			if(hasDontEnumBug){
				for(i=0; i<dontEnumsLength;i++){
					if(hasOwnProperty.call(obj, dontEnums[i])){
						result.push(dontEnums[i]);
					}
				}
			}
			return result.length;
		}
})();

//判断是否为邮箱地址
function isEmail(email){
	return /^([\w_\-\+\.])+\@([\w\-]+\.)+[\w]{2,10}$/.test(email);
};

//判断是否为手机号
function isMobilePhone(num){
	return /^1\d{10}$/.test(num);
};


/*
* DOM部分
*/

//是否有该类
function hasClass(element, className){
	var classNames = element.className;
	if(!className){
		return false;
	}
	classNames = classNames.split(/\s+/);
	for(var i=0, len=classNames.length; i<len; i++){
		if(classNames[i] === className){
			return true;
		}
	}
	return false;
};

//添加类
function addClass(element, className){
	if(className && !hasClass(element, className)){
		element.className = element.className?[element.className, className].join(' '):className;
	}
};

//删除类
function removeClass(element, className){
	if(className && hasClass(element, className)){
		var classNames = element.className;
		className = className.split(/\s+/);
		for(var i=0, len=classNames.length; i<len; i++){
			if(classNames[i] === className){
				classNames.splice(i, 1);
				break;
			}
		}
		element.className = classNames.join(' ');
	}
};

//是否为同一父节点下的元素
function isSiblingNode(element, siblingNode){
	return element.parentNode === siblingNode.parentNode;
};

//获得相对于浏览器窗口的位置，返回一个对象{x,y}
function getPosition(element){
	return element.getBoundingClientRect();
};

//mini Query
function $(selector){
	return document.querySelectorAll(selector);
};
//添加事件
function addEvent(element, event, listener){
	if(element.addEventListener){
		element.addEventListener(event, listener, false);
	}
	else if(element.attachEvent){
		element.attachEvent('on'+event, listener);
	}
	return element;
};
//删除事件
function removeEvent(element, event, listener){
	if(element.removeEventListener){
		element.removeEventListener(event, listener, false);
	}
	else if(element.detachEvent){
		element.detachEvent('on'+event, listener);
	}
	return element;
};
//添加点击事件
function addClickEvent(element, listener){
	return addEvent(element, 'click', listener);
};
//添加回车事件
function addEnterEvent(element, listener){
	return addEvent(element, 'keypress', function(e){
		var event = e || window.event;
		var keyCode = event.witch || event.keyCode;
		if(keyCode == 13){
			listener.call(element, event);
		}
	});
}

//将事件绑定到$上
$.on = function(selector, event, listener){
	return addEvent($(selector), event, listener);
};
$.un = function(selector, event, listener){
	return removeEvent($(selector), event, listener);
};
$.click = function(selector, listener){
	return addClickEvent($(selector), listener);
};
$.enter = function(selector, listener){
	return addEnterEvent($(selector), listener);
};

//事件代理
function delegateEvent(element, tag, eventName, listener){
	addEvent(element, eventName, function(e){
		var event = e || window.event;
		var target = event.target || event.srcElement;
		if(target && target.tagName === tag.toLowerCase()){
			listener.call(target, event);
		}
	});
};

$.delegate = function(selector, tag, eventName, listener){
	return delegateEvent($(selector), tag, eventName, listener);
};

//ajax
function ajax(url, options){
	//options:{type:post/get, data:, onsuccess:, onfail:}
	
};

//继承
function extend(child, parent){
	var F = function(){};
	F.prototype = parent.prototype;
	child.prototype = new F();
	child.prototype.constructor = child;
	//备用，可以调用父级方法
	child.uber = parent.prototype;
};

//bind使得this指向正确的引用
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                                 ? this
                                 : oThis || window,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
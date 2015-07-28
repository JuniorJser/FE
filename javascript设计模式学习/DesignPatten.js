/*
* @Author: Tinker
* @Title: Learning Javascript Design Pattens 
* @Date: 2015/7/28
*/

//单例模式
//单例模式：一个类只能有一个实例
//简单示范
var singleton = function(fn){
	//通过闭包存储第一次的返回值
	var result; 
	//如果单例已经存在就不再创建新的例子
	return result || result = fn.apply(this, arguments);
};

//工厂模式
//简单工程模式(常用)：由一个方法来决定创建哪个实例，这些实例通常有相同的接口
//简单示例
var XMLHttpFactory = function(){};
//XMLHttpFactory.createXMLHttp根据当前情况来创建一个实例
XMLHttpFactory.createXMLHttp = function(){
	var XMLHttp = null;
	if(window.XMLHttpRequest){
		XMLHttp = new XMLHttpRequest();
	}else if(window.ActiveXObject){
		XMLHttp = new ActiveXObject('Microsoft.XMLHttp');
	}
	return XMLHttp;
};
//抽象工厂模式(不常用)：设计一个抽象类，这个类不能被实例化，只能用来派生子类，最后对子类的拓展来实现工厂方法
//简单示例
var XMLHttpFactory = function(){};
XMLHttpFactory.prototype = {
	//这个方法用来派生子类，调用会报错
	createFactory: function(){
		throw new Error("This is an abstract class.");
	}
};
//派生子类，详见js实现继承的方式
var XMLHandler = function(){
	XMLHttpFactory.call(this);
};
XHRHandler.prototype = new XMLHttpFactory();
XHRhandler.constructor = XHRHandler;
XHRHandler.prototype.createFactory = function(){
	var XMLHttp = null;
	if(window.XMLHttpRequest){
		XMLHttp = new XMLHttpRequest();
	}else if(window.ActiveXObject){
		XMLHttp = new ActiveXObject('Microsoft.XMLHttp');
	}
	return XMLHttp;
};

//桥接模式
//桥接模式：用来弱化它与使用它的类和对象之间的耦合，将抽象与实现隔离开来
//简单示例
var each = function(arr, fn){
	for(var i = 0, len = arr.length; i<len; i++){
		fn.call(arr[i], i);
	}
};

//适配器模式
//适配器模式：将一个类的接口转换成希望的另一个接口，使得由于接口不兼容而不能一起工作的类可以一起工作
//简单示例
var clientObject = {
	s1:"1",
	s2:"2",
	s3:"3"
};
function interfaceMethod(s1, s2, s3){
	console.log(s1);
};
//适配器函数
function adapterMethod(o){
	interfaceMethod(o.s1, o.s2, o.s3);
};
adapterMethod(clientObject);

//外观模式
//外观模式：提供一个高层接口，使得调用更加方便
//简单示例
var stopEvent(){
	//阻止事件默认行为和冒泡
	e.stopPropagation();
	e.preventDefault();
}

//代理模式
//代理模式：把对一个对象的访问交给另一个代理对象来操作
//简单示例
function delegateEvent(element, tag, eventName, listener){
	//事件代理，element为代理借点，tag为目标节点
	addEvent(element, eventName, function(e){
		var event = e || window.event;
		var target = event.target || event.srcElement;
		if(target && target.tagName.toLowerCase() === tag.toLowerCase()){
			listener.call(target, event);
		}
	});
};

//观察者模式
//观察者模式：定义对象间一对多的依赖关系，以便当一个对象发生改变时，其他依赖他的对象都得到通知并刷新
//简单示例
var fn1 = function(){};
var fn2 = function(){};
//click为观察者，fn1,fn2为订阅者
addEvent(element, 'click', fn1);
addEvent(element, 'click', fn2);

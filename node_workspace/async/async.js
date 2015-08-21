//遍历数组
//异步串行
(function next(i, len, callback) {
	if(i < len) {
		async(arr[i], function(value) {
			arr[i] = value;
			next(i + 1, len, callback);
		});
	} else {
		callback();
	}
}(0, arr.length, function() {
	//do something
}));

//异步并行
(function (i, len, count, callback) {
	for(; i < len; ++i) {
		(function (i){
			async(arr[i], function(value) {
				arr[i] = value;
				if(++count === len){
					callback();
				}
			});
		}(i));
	}
}(0, arr.length, 0, function(){
	//do something
}));

//异步异常处理
function async(fn, callback) {
	setTimeout(function(){
		try{
			callback(null, fn());
		} catch(err) {
			callback(err);
		}
	}, 0);
}

async(null, function(err, data){
	if(err){
		console.log('Error:%s', err.message);
	} else {
		//do something
	}
});

//多次异步调用..
//同步遍历文件
function travel1(dir, callback) {
	fs.readdirSync(dir).forEach(function(file) {
		var pathname = path.join(dir, file);

		if(fs.statSync(pathname).isDirectory()) {
			travel1(pathname, callback);
		} else {
			callback(pathname);
		}
	});
}

//异步遍历文件
function travel2(dir, callback) {
	fs.readdir(dir, function(err, files) {
		(function next(i) {
			if(i < files.length) {
				var pathname = path.join(dir, files[i]);

				fs.stat(pathname, function(err, stats){
					if(stats.isDirectory()) {
						travel2(pathname, callback, function(){
							next(i + 1);
						});
					} else {
						callback(pathname, function() {
							next(i + 1);
						});
					}
				});
			} else {
				finish && finish();
			}
		})(0);
	});
}
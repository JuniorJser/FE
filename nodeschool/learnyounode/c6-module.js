var fs = require('fs');
var path = require('path');
module.exports = function(dir, filter, callback){
	fs.readdir(dir, function(err, data){
		if(err){
			return callback(err);
		}
		callback(null, data.filter(function(item){
			return path.extname(item) === '.' + filter;
		}));
	});
}

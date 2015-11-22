var fs = require('fs');
//var path = require('path');
fs.readdir(process.argv[2], function(err, fileList){
	if(fileList){
		fileList.forEach(function(item){
			item.match("."+process.argv[3]) && console.log(item);
			//path.extname(item) === "." + process.argv[3] && console.log(item);
		});
	}else{	
		console.log(err);
	}
});
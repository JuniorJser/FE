console.log(process.argv.slice(2).reduce(function(pre, cur){
	return Number(pre)+Number(cur);
}));
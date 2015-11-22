module.exports = function average(...args){
	var len = args.length;
	var sum = args.reduce((prev, next) => prev+next, 0);
	return sum/len;
}
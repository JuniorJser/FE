console.log(html`<b>${process.argv[2]} says</b>: "${process.argv[3]}"`);

function html(s, ...arr){
	var result = s[0];
	for(var i = 0, len = arr.length; i < len; i++){
		result += replace(arr[i]) + s[i+1];
	}
	return result;
}

function replace(item){
	return item.replace(/(&|'|"|<|>)/g, function($1){
		if($1 == "'"){
			return "&apos;";
		}
		if($1 == "&"){
			return "&amp;";
		}
		if($1 == '"'){
			return "&quot;";
		}
		if($1 == "<"){
			return "&lt;";
		}
		if($1 == ">"){
			return "&gt;";
		}
	});
}
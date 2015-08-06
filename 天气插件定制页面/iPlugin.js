
;(function(){
	//默认配置
	var config = {name:'未命名', skin:'skin1', city:'北京', width:'200px', height:'100px'};
	var width = 200, height = 100;
	//生成代码	
	function createCode(){
		config.name = $('#name').val();
		config.skin = $("input[name='skin']:checked").val();
		config.city = $('#city').val();
		config.width = width+'px';
		config.height = height+'px';
		var tpl = __inline('/page/testPlugin.tpl'); 
		content = template.compile(tpl)(config);
		$('#code').text(content);
		$('.preLoad').html(content);
		console.log(config);
		console.log(content);
	}
	//判断是否为数字
	function isNum(n, def, selector){
		if(isNaN(n)){
			selector.addClass('error');
			return def;
		}
		else{
			selector.removeClass('error');
			return n;
		}
	}
	//复制到粘贴板，来源：网络
	function copyToClipboard(maintext){
		if (window.clipboardData){
			window.clipboardData.setData("Text", maintext);
		}else{
			alert('该浏览器不支持一键复制！请切换FF/IE或者手动复制！');
			return;
		}
		alert("以下内容复制成功！" + maintext);
	}
	//插件点击事件
	$('.clickMore').click(function(){
		$('.pluginBox').toggle();
		$('.selected').show();
	});
	$('.plugin').click(function(){
		$('.plugin').removeClass('clicked').find('span').text('点击选择');
		$(this).addClass('clicked').find('span').text('当前选择');
		$('.pluginBox').removeClass('selected').hide();
		$(this).parent().addClass('selected').show();
		createCode();
	});
	//样式改变则代码改变
	$("input[type='radio']").click(function(){
		createCode();
	});
	$("input[type='text']").blur(function(){
		$();
		width = $('#width').val(), height = $('#height').val();
		width = isNum(width, 200, $('#width'));
		height = isNum(height, 100, $('#height'));
		console.log(width);
		createCode();
	});
	$('#city').change(function(){
		createCode();
	});
	$('.codeBox p').click(function(){
		var text = $('#code').text();
		copyToClipboard(text);
	});
	//初始化
	$('.clicked').click();
})();

;(function(){
	//默认iframe
	var iframe;
	//样例数据
	var data = {
		"plugins": [{
			"url": "111",
			"name": "天气实况",
			"thumbnail": "a.jpg",
			"skins": [{
				"name": "扁平风",
				"value": 0
			}, {
				"name": "3D版",
				"value": 1
			}],
			"size":"155,145"
		},{
			"url": "111",
			"name": "天气实况1",
			"thumbnail": "a.jpg1",
			"skins": [{
				"name": "扁平风1",
				"value": 0
			}, {
				"name": "3D版1",
				"value": 1
			}],
			"size":"150,140"
		},{
			"url": "111",
			"name": "天气实况",
			"thumbnail": "a.jpg",
			"skins": [{
				"name": "扁平风",
				"value": 0
			}, {
				"name": "3D版",
				"value": 1
			}],
			"size":"155,145"
		},{
			"url": "111",
			"name": "天气实况1",
			"thumbnail": "a.jpg1",
			"skins": [{
				"name": "扁平风1",
				"value": 0
			}, {
				"name": "3D版1",
				"value": 1
			}],
			"size":"150,140"
		},{
			"url": "111",
			"name": "天气实况",
			"thumbnail": "a.jpg",
			"skins": [{
				"name": "扁平风",
				"value": 0
			}, {
				"name": "3D版",
				"value": 1
			}],
			"size":"155,145"
		},{
			"url": "111",
			"name": "天气实况1",
			"thumbnail": "a.jpg1",
			"skins": [{
				"name": "扁平风1",
				"value": 0
			}, {
				"name": "3D版1",
				"value": 1
			}],
			"size":"150,140"
		},{
			"url": "111",
			"name": "天气实况",
			"thumbnail": "a.jpg",
			"skins": [{
				"name": "扁平风",
				"value": 0
			}, {
				"name": "3D版",
				"value": 1
			}],
			"size":"155,145"
		},{
			"url": "111",
			"name": "天气实况1",
			"thumbnail": "a.jpg1",
			"skins": [{
				"name": "扁平风1",
				"value": 0
			}, {
				"name": "3D版1",
				"value": 1
			}],
			"size":"150,140"
		}]
	};
	var plugins = data.plugins;
	var skins,width,height,size,baseUrl;

	//初始化插件
	function iPluginInit(){
		var div = "<div class='pluginBox'></div>";
		var a;
		for(var i=0, len=plugins.length; i<len; i++){
			if( i%4 == 0 ){
				$('.pluginContainer .title').after(div);
			}
			a = "<a pluginid="+ i +" style='background:" + plugins[i].thumbnail +"' class='plugin' href='javascript:;''><i class='arrow'></i><span>"+ plugins[i].name +"</span></a>";
			$('.pluginContainer .title').next().append(a);
		}
		//初始化
		$('.pluginContainer').find('.pluginBox').eq(0).children().eq(0).click();
	};

	//初始化插件对应样式
	function styleInit(id){
		//skin
		skins = plugins[id].skins;
		size = plugins[id].size.split(',');
		width = size[0];
		height = size[1];
		baseUrl = plugins[id].url;
		var checkbox;
		$('#skin label').remove();
		for(var i = 0, len = skins.length; i<len; i++){
			checkbox = "<label><input type='radio' name='skin' checked='checked' value='"+ skins[i].value +"'>"+ skins[i].name +"</label>";
			$('#skin span').after(checkbox);
		}

		//size
		$('#width').val(width);
		$('#height').val(height);

		createCode();
	};

	//生成代码	
	function createCode(){
		var w, h, s, c;
		s = $("input[type='radio']:checked").val();
		c = $("select").val();
		w = $('#width').val();
		h = $('#height').val();
		var src = baseUrl+'?skin='+s+'&station='+c;
		iframe = "<iframe src='"+src+"' width='"+ w +"' height='"+ h +"'></iframe>"; 
		$('#code').text(iframe);
		$('.preLoad').html(iframe);
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

	$('.pluginContainer').on('click', 'a', function(){
		$('.plugin').removeClass('clicked').find('span');
		$(this).addClass('clicked').find('span');
		$('.pluginBox').removeClass('selected').hide();
		$(this).parent().addClass('selected').show();
		var id = $(this).attr('pluginid');
		styleInit(id);
	});
	//样式改变则代码改变
	$('.styleContainer').on('click', $("input[type='radio']"), function(){
		createCode();
	});
	$('.styleContainer').on('blur', "input[type='text']", function(){
		createCode();
	});

	$('#city').change(function(){
		createCode();
	});

	$('.codeBox p').click(function(){
		var text = $('#code').text();
		copyToClipboard(text);
	});

	$('.size p').click(function(){
		console.log(1);
		$('#width').val(width);
		$('#height').val(height);
	});

	iPluginInit();
})();
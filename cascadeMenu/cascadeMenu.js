;(function(){
	var template = require("lib/template");
	var testData = [{areaName:'鄞州',townName:['一一','一二','一三']},{areaName:'海曙',townName:['二一','二二','二三']},{areaName:'奉化',townName:['三一','三二','三三']}];
	var tpl = __inline('cascadeMenu.tpl');
	var tpl2 = __inline('subMenu.tpl');
	$('#cascadeMenu').html(template.compile(tpl)(testData));

	//事件代理
	$('.cascadeBlock').on('mouseover','div',function(){
		$(this).find('ul').show();
	});
	$('.cascadeBlock').on('mouseout','div',function(){
		$(this).find('ul').hide();
	});
	$('.cascadeBlock').on('click','li',function(){
		var content = $(this).text();
		$(this).parent().prev().text(content);
		$(this).parent().hide();
		var id = $(this).attr('dataid');
	});
	$('.mainMenu').on('click','li',function(){
		var dataid = $(this).attr('dataid');
		$('.subMenu').empty();
		$('.subMenu').html(template.compile(tpl2)(testData[dataid]));
		$('.subMenu').find('li').eq(0).click();
	});

	$('.mainMenu').find('li').eq(0).click();

})();
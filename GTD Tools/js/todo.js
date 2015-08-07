//点击列表项的事件代理
$('.typelist').delegate('div', 'click', function(){
	$('.typeclicked').removeClass('typeclicked').children('.m-delete').hide();
	$(this).addClass('typeclicked').children('.m-delete').css("display","inline-block");
	$(this).next().slideToggle('fast');
});
//鼠标移入移出列表项的事件代理
$('.typelist').delegate('div', 'mouseenter', function(){
	$(this).addClass('hovered');
	$(this).children('.m-delete').css("display","inline-block");
});
$('.typelist').delegate('div', 'mouseleave', function(){
	$(this).removeClass('hovered');
	$(this).children('.m-delete').hide();
});
//新增项目，点击默认项新增的是分类，点击分类新增的是子分类，出于页面布局考虑暂时只支持两层分类
$('.g-l-foot').click(function(){
	var newname = prompt("请输入名称：");
	if(newname){
		if($('.typeclicked').hasClass("default")){
			$('.typeclicked').parent().parent().append('<li><div class="item subitem"><span class="m-type">'+ newname+'(0)'+'</span><span class="m-delete">×</span></div><ul class="disnone"></ul></li>');
		}
		else if($('.typeclicked').hasClass("subitem")){
			$('.typeclicked').next().append('<li><div class="item"><span class="m-task">'+newname+'(0)'+'</span><span class="m-delete">×</span></div></li>');
		}
	}
});
//删除分类
$('.typelist').on('click', '.m-delete', function(e){
	if(confirm("确认删除？")){
		$(this).parent().parent().empty();
	}
});
//任务的tab切换
$('.g-m-head span').click(function(){
	$('.g-m-head span').removeClass('tabchecked');
	$(this).addClass('tabchecked');
});

$('.tasklist').delegate('div', 'click', function(){
	$('.taskclicked').removeClass('taskclicked').children('.m-delete').hide();
	$(this).addClass('taskclicked').children('.m-delete').css("display","inline-block");
});

$('.tasklist').delegate('div', 'mouseenter', function(){
	$(this).addClass('hovered');
	$(this).children('.m-delete').css("display","inline-block");
});
$('.tasklist').delegate('div', 'mouseleave', function(){
	$(this).removeClass('hovered');
	$(this).children('.m-delete').hide();
});
$('.m-todotime').click(function(){
	$(this).next().slideToggle('fast');
});
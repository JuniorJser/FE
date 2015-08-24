;(function(){
var config = [{
	title:"今明天气预报0",
	content:'111111111111111111111'
},{
	title:"今明天气预报1",
	content:"2222222222222222222222222222222222"
},{
	title:"今明天气预报2222",
	content:"3333333333333333333333333333"
}];

var count = 0;
var len = config.length;
var timer = null;

var marquee = function (data){
	$('#title span').html(data.title);
	$('#content span').html(data.content);
	$('#title span').fadeIn('slow');
	$('#content').width($('#title').parent().width()-$('#title').width()-30);
	$('#content li').animate({top:0},'slow', function(){
		var width = $('#content li').width();
		timer = setInterval(function(){
			var left = $('#content li').position().left;
			if( left+width<= 0){
				clearInterval(timer);
				$('#title span').hide();
				$('#content li').css({left:0,top:-23});
				marquee(config[count++ % len]);
				return;
			}
			$('#content li').css({left:left-1});
		},30);
	});
	
}

var tpl ="<div class='marqbox'>"
		+"     <div id='title' class='marquee-author'>"
		+"       <span>"
		+"        </span>"
		+"      </div>"
		+"      <ul id='content' class='marquee' style='width:0px;'>"
		+"        <li class='marquee-showing'>"
		+"        <span></span></li>   "       
		+"      </ul>"
   		+"</div>";

var init = function(){
	//加载模版
	$('.container').html(tpl);
	//绑定事件
	$('#content').hover(function(){
		clearInterval(timer);
	},function(){
		if($('#content li').position().top == 0){
			var width = $('#content li').width();
			timer = setInterval(function(){
				var left = $('#content li').position().left;
				if( left+width <= 0){
					clearInterval(timer);
					$('#title span').hide();
					$('#content li').css({left:0,top:-23});
					marquee(config[count++ % len]);
					return;
				}
				$('#content li').css({left:left-1});
			},30);
		};
	});
	//读取数据进行滚动
	marquee(config[count++ % len]);
}

init();

}());
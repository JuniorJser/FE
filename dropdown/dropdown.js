;(function(){

var template = require("lib/template");
function getTop(){
	var top = $(this).position().top;
	var height = $(this).height();
	var actionId = $(this).attr('actionId');
	$('div[actionFor='+ actionId +']').css({top:top+height+10}).slideToggle('fast');
};

$('*[actionId]').click(getTop);
$('div[actionFor]').on('click','a', function(){
	$('div[actionFor]').slideToggle('fast');
});

//配置数据
var testData = [{cityName:'宁波',areaName:['鄞州','海曙','北仑','奉化']},{cityName:'宁波',areaName:['鄞州','海曙','北仑','奉化']},{cityName:'宁波',areaName:['鄞州','海曙','北仑','奉化']},{cityName:'宁波',areaName:['鄞州','海曙','北仑','奉化']}];

var tpl = __inline('listItem.tpl');
$('.midBlock ul').html(template.compile(tpl)(testData));

})();
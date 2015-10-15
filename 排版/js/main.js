;(function(){
	$('.icon').click(function(){
		$(this).parent().next().slideToggle('middle');
		if($(this).hasClass('rotate0')){
			$(this).removeClass('rotate0');
		}else{
			$(this).addClass('rotate0');
		}
	});
})();


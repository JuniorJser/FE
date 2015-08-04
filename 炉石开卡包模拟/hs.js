;(function(){
	var drag=false, curX, curY, tarX, tarY, sum = 5;
	var clone;
	$('.sum').html('剩余数量:'+sum);
	$('.inputsum input').blur(function(){
		sum = $(this).val();
		$('.sum').html('剩余数量:'+sum);
		console.log($('.kabao'));
		if($('.kabao').length == 0){
			$('.kabao_container').append(clone).removeClass('none');
		}
		if(sum<2){
			$('.kabao_container').addClass('none');
		}
	});
	$('.kabao_container').on('mousedown', $('.kabao'), function(e){
		clone = $('.kabao').clone();
		drag = true;
		curX = e.clientX ;
		curY = e.clientY ;
	});
	document.onmousemove = function(e){
		if(!drag)
			return;
		var e = e || window.event;
		tarX = e.clientX;
		tarY = e.clientY;
		$('.kabao').css({left:tarX-curX+'px', top:tarY-curY+'px'});
	};
	document.onmouseup = function(e){
		drag = false;
		if($('.kabao').length ==0 ){
			return;
		}
		var offset = $('.kabao').offset();
		if(675<offset.left && offset.left<1075 && -150<offset.top && offset.top<450){
			$('.kabao').css({left:'600px', top:'0px'}).fadeOut('fast',function(){
				$(this).remove();
				if(sum>0){
					$('.kabao_container').append(clone);
				if(sum == 1){
					$('.kabao_container').addClass('none');
				}
			}
			});
			sum--;
			
			$('.sum').html('剩余数量:'+sum);
		}
		else{
			$('.kabao').css({left:'0px', top:'0px'});
		}
	};
})();
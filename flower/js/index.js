$(function(){
	
	// 网页头部
	var $header = $("#header"),
		$nav = $header.find(".nav"),
		$icon = $header.find(".icon"),
		$span = $icon.find("span"),
		$line = $nav.find(".line"),
		$a = $nav.find("a"),
		length = $span.length,
		arr = [];

	$a.each(function(){
		var i = $(this).index();
		arr.push($a.eq(i).offset().left);
	});

	$a.hover(function(){
		var i = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$line.css({
			"left" : arr[i]-arr[0]
		});
	});

	$nav.mouseleave(function(){
		$a.eq(0).addClass("on").siblings().removeClass("on");
		$line.css({
			"left" : 0
		});		
	});

	$icon.onOff = true;
	$icon.click(function(){
		if($icon.onOff){
			$nav.show();
			$header.height(390);
			$span.addClass("on");
		}else{
			$nav.hide();
			$header.height(80);
			$span.removeClass("on");
		}
		$icon.onOff = !$icon.onOff;
	});

	$(window).resize(function(){
		$a.each(function(){
			var i = $(this).index();
			arr[i] = $a.eq(i).offset().left;
		});		

		if(window.innerWidth > 768){
			$nav.show();
			$header.height(80);
		}else{
			if($icon.onOff){
				$nav.hide();
				$header.height(80);
			}else{
				$nav.show();
				$header.height(390);
			}
		}
	});
	

	// 轮播图
	$("#banner").banner({
		picE : ".pic li",
		btnE : ".btn li",
		tabE : ".tab li",
		time : 3000
	});
});
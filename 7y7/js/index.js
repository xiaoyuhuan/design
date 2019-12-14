// 导航栏 - 搜索
(function() {
	var $nav = $("#nav"),
		$search = $nav.find(".search"),
		$open = $search.find(".open"),
		$cover = $search.find(".cover"),
		$close = $cover.find(".close");

	$open.click(function() {
		$cover.show();
	});

	$close.click(function() {
		$cover.hide();
	})
})();


// 轮播图
(function() {
	var $banner = $("#banner"),
		$picUl = $banner.find(".slide .pic ul"),
		$picLi = $picUl.find("li"),
		$btnDiv = $banner.find(".slide .btn div"),
		$textLi = $banner.find(".slide .text ul li"),
		$num = $banner.find(".slide .text .page span"),
		rowNum = 3,
		length = $picLi.length,
		width = $picLi.width(),
		lastDate = new Date(),
		timer = null,
		index = 0;

	// 初始化
	for(var i = 0; i < rowNum; i++) {
		$picUl.append($picLi.eq(i).clone(true,true));
		$picUl.prepend($picLi.eq(length-i-1).clone(true,true));
	}	
	$picUl.css({
		"width" : width*(length+rowNum*2),
		"marginLeft" : -width*rowNum
	});		

	// 点击事件
	$btnDiv.click(function() {
		if(new Date() - lastDate > 600) {
			var n = $(this).index();
			n ? index++ : index--; 
			play();
			lastDate = new Date();
		}
	});	

	// 自动轮播
	$banner.hover(function() {
		clearInterval(timer);
	},function() {
		timeAuto();			
	});	
	timeAuto();	
	function timeAuto() {
		timer = setInterval(function(){
			index++;
			play();
		},5000);			
	}	
	
	// 轮播函数
	function play() { 
		var aindex = index;
		aindex %= length;
		if(aindex < 0) {
			aindex = length+aindex;
		}

		$num.html(aindex+1); 
		$textLi.eq(aindex).addClass("on").siblings().removeClass("on"); 
		
		$picUl.stop().animate({"marginLeft" : -width*(index+rowNum)},500,function() {
			if(index === length) { 
				$picUl.css("marginLeft",-width*rowNum+"px");
				index = 0;
			}else if(index <= -rowNum) {
				$picUl.css("marginLeft",-width*length+"px");
				index = length-rowNum;
			}
		});	
	}
})();


// 推荐 - 新闻
(function() {
	var $advise = $("#advise"),
		$tit = $advise.find(".news-tit li"),
		$con = $advise.find(".news-con ul");

	$tit.click(function() {
		var index = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$con.eq(index).addClass("on").siblings().removeClass("on");
	});
})();


// 时尚 - 轮播图
(function() {
	var $slide = $("#fashion").find(".fashion-top .slide"),
		$picLi = $slide.find(".pic ul li"),
		$tabLi = $slide.find(".tab ul li"),
		$btnDiv = $slide.find(".btn div"),
		length = $picLi.length,
		nowTime = new Date(),
		timer = null,
		index = 0,
		arrT = [], 
		arrL = [], 
		arrW = [], 
		arrH = [],		 
		arrO = [],	
		arrZ = [], 
		a = 0;

	// 点击事件
	$btnDiv.click(function() {
		if(new Date() - nowTime > 500) {
			move($(this).index());
			nowTime = new Date();
		}
	});		

	// 自动轮播
	$slide.hover(function() {
		clearInterval(timer);
	},function() {
		timeAuto();			
	});	
	timeAuto();	
	function timeAuto() {
		timer = setInterval(function(){
			move(1);
		},3000);			
	}		
	
	// 轮播函数
	function move(flag) {
		if(flag) {
			index ++;
		}else {
			index --;
		}
		index = index % length;
		if(index < 0) index = length-1;
		$tabLi.eq(index).addClass("on").siblings().removeClass("on");
		
		$picLi.each(function(i) {
			arrT[i] = $(this).css("top");
			arrL[i] = $(this).css("left");
			arrW[i] = $(this).css("width");
			arrH[i] = $(this).css("height");			
			arrO[i] = $(this).css("opacity");
			arrZ[i] = $(this).css("z-index");
		});

		$picLi.each(function(i) {
			if(flag) {
				a = i + 1;
			}else {
				a = i - 1;
			}
			a = a % length;
			if(a < 0) a = length-1;

			$(this).css("z-index", arrZ[a]);
			$(this).stop().animate({
				left : arrL[a],
				top : arrT[a],			
				width : arrW[a],
				height : arrH[a],
				opacity : arrO[a]
			},500);			
		});
	}
})();


// 时尚 - 新闻
(function() {
	var $fashion = $("#fashion"),
		$tit = $fashion.find(".news-tit li"),
		$con = $fashion.find(".news-con ul");

	$tit.click(function() {
		var index = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$con.eq(index).addClass("on").siblings().removeClass("on");
	});
})();


// 时尚 - 优品
$("#fashion .fashion-goods .slide").banner({
    type : "LRslide",
    seamless : true,
    rowNum : 3,
    picE : ".pic ul li",
	btnE : ".btn div",
	time : 3000
});


// 时尚 - 大片
$("#fashion .fashion-bot .slide").banner({
    type : "fade",
    picE : ".pic ul li",
    tabE : ".tab ul li",
    tabType : "click"
});


// 时尚 - 时尚博主
$("#fashion .scrollbar").scrollbar({
    content : ".content",
    bar : ".bar",
    move : ".move"
});


// 美容 - 护肤
$("#beauty .slide").banner({
    type : "fade",
    picE : ".pic ul li",
    tabE : ".tab ul li",
    tabType : "click"
});


// 美容 - 美发
$("#beauty .beauty-bot .slide").banner({
    type : "fade",
    picE : ".pic ul li",
    tabE : ".tab ul li",
    tabType : "click"
});


// 美容 - 医学美容
$("#beauty .scrollbar").scrollbar({
    content : ".content",
    bar : ".bar",
    move : ".move"
});


// 返回顶部
(function() {
	var $back = $("#back");

	$(window).scroll(function() {
		if($(this).scrollTop() >= 100) {
			$back.show();
		}else {
			$back.hide();
		}
	});	

	$back.click(function() {
		$("body,html").stop().animate({
			"scrollTop" : "0px"
		});	
	});
})();
// 轮播插件封装
$.fn.extend({
	banner : function(mJson) {
		var type = mJson.type || "LRslide",
			seamless = mJson.seamless || false,
			rowNum = mJson.rowNum || 1,
			picLi = mJson.picE,
			btnDiv = mJson.btnE,
			tabLi = mJson.tabE,
			tabType = mJson.tabType || "click",
			time = mJson.time;

		var $picLi = this.find(picLi),
			$tabLi = this.find(tabLi),
			$btnDiv = this.find(btnDiv),
			$picUl = $picLi.parent(), 
			width = $picLi.width() + parseInt($picLi.css("marginRight")),
			height = $picLi.height(),
			length = $picLi.length,
			lastDate = new Date(),
			timer1 = null,
			timer2 = null,	
			tabTime = 0,		
			index = 0;

		// 初始化
		this[0].onselectstart = function() {return false};
		
		if(type === "LRslide" && seamless) {
			for(var i = 0; i < rowNum; i++) {
				$picUl.append($picLi.eq(i).clone(true,true));
				$picUl.prepend($picLi.eq(length-i-1).clone(true,true));
			}
			
			$picUl.css({
				"width" : width*(length+rowNum*2),
				"marginLeft" : -width*rowNum
			});	
		}else if(type === "fade") {
			$picLi.hide().eq(0).show();	
		}
		
		// 关于btn
		if(btnDiv) {
			$btnDiv.click(function() {
				if(new Date() - lastDate > 600) {
					var n = $(this).index();
					n ? index++ : index--; 
					play();
					lastDate = new Date();
				}
			});
		}

		// 关于tab
		if(tabLi) {
			tabTime = tabType === "click" ? 10 : 200;
			$tabLi[tabType](function() {
				if(index != $(this).index()) {
					index = $(this).index();
					clearTimeout(timer1);
					timer1 = setTimeout(play,tabTime);					
				}
			});
		}		

		// 关于自动轮播
		if(time) {
			this.hover(function() {
				clearInterval(timer2);
			},function() {
				timeAuto();			
			});	
			timeAuto();	
			function timeAuto() {
				timer2 = setInterval(function(){
					index++;
					play();
				},time);			
			}	
		}				
		
		// 轮播函数
		function play() { 
			var aindex = index; 
			aindex %= length;
			if(aindex < 0) {
				aindex = length+aindex;
			}

			$tabLi.eq(aindex).addClass("on").siblings().removeClass("on");

			if(type === "LRslide" && seamless) {
				$picUl.stop().animate({"marginLeft" : -width*(index+rowNum)},500,function() {
					if(index === length) { 
						$picUl.css("marginLeft",-width*rowNum+"px");
						index = 0;
					}else if(index <= -rowNum) {
						$picUl.css("marginLeft",-width*length+"px");
						index = length-rowNum;
					}
				});
			}else if(type === "fade") {
				$picLi.eq(aindex).stop().fadeIn().siblings().stop().fadeOut();
			}		
		} 
	}
});

// 适用类型：淡入淡出、一行多列图片无缝
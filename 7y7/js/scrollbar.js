// 滚动插件封装
$.fn.extend({
	scrollbar : function(mJson) {
		var content = mJson.content,
			bar = mJson.bar,
			move = mJson.move;

		var $content = this.find(content),
			$bar = this.find(bar),
			$move = this.find(move),
			minCTop = parseInt($content.css("top")),
			maxCTop = $content.height()-this.height(),
			minMTop = parseInt($move.css("top")),
			maxMTop = $bar.height()-$move.height()-minMTop;

		$move.mousedown(function(e) {
			e = e || window.event;
			var sY = e.clientY;
			var sT = this.offsetTop;		

			$(document).mousemove(function(e) { 
				e = e || window.event;
				var nY = e.clientY;
				var top = nY - sY + sT;		

				setTop(top);
			});
		});

		$(document).mouseup(function() {
			$(this).off("mousemove");
		});

		function setTop(mTop) {
			mTop = Math.max(mTop,minMTop);
			mTop = Math.min(mTop,maxMTop);		
			$move.css("top", mTop);

			var cTop = (mTop-minMTop)*maxCTop/maxMTop; 
			$content.css("top", -cTop);
		}		
	}
});
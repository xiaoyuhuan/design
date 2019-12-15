$.fn.extend({
    banner : function (mJson) {
        var picLi = mJson.picE,
            btnLi = mJson.btnE,
            tabLi = mJson.tabE,
            time = mJson.time;

        var $picLi = this.find(picLi),
            $tabLi = this.find(tabLi),
            $btnLi = this.find(btnLi),
            $pic = $picLi.parent(),
            length = $picLi.length,
            lastDate = new Date(),
            timer1 = null,
            timer2 = null,
            index = 0;

        // 样式初始化
        $pic.prepend($picLi.last().clone(true,true));
        $pic.append($picLi.first().clone(true,true));
        $pic.css({
            "width" : (length+2)*100+"%",
            "left" : "-100%"
        });

        var $picLi = $pic.find("li");
        $picLi.css({
            "width" : 100/(length+2)+"%"
        });

        // tab点击
        $tabLi.click(function() {
            if(index != $(this).index()) {
                index = $(this).index();
                clearTimeout(timer1);
                timer1 = setTimeout(play,10);
            }
        });

        // btn点击
        $btnLi.click(function() {
            if(new Date() - lastDate > 600) {
                var n = $(this).index();
                n ? index++ : index--;
                play();
                lastDate = new Date();
            }
        });

        // banner移入移出
        this.hover(function() {
            clearInterval(timer2);
        },function() {
            timeAuto();
        });

        // 自动轮播
        timeAuto();
        function timeAuto() {
            timer2 = setInterval(function(){
                index++;
                play();
            },time);
        }

        // 轮播函数
        function play() {
            var aindex = index;
            aindex %= length;
            if(aindex < 0) {
                aindex = length-1;
            }

            $tabLi.eq(aindex).addClass("on").siblings().removeClass("on");

            $pic.stop().animate({"left" : -(index+1)*100+"%"},500,function() {
                if(index === length) {
                    $pic.css("left","-100%");
                    index = 0;
                }else if(index < 0) {
                    $pic.css("left",-length*100+"%");
                    index = length-1;
                }
            });
        }
    }
});

// 全屏左右无缝轮播
define(['jquery'], function($){
    var loadmore = function(){
        var clock;
        $(window).on('scroll', function(){
            if(clock){
                clearTimeout(clock);
            }
            clock = setTimeout(function(){
                checkshow();
            }, 500);
        });
        $(window).on('resize', function(){
            checkshow();
        })

        checkshow();

        function checkshow(){
            if(isShow($('#load'))){
                loadAndPlace();
            }
        }
        function isShow($node){
            var scrollH = $(window).scrollTop(),    //鼠标滚动的距离
                winH = $(window).height(),          //窗口的高度
                top = $node.offset().top;           //元素相对顶部的距离
            if(top < scrollH + winH){
                return true;
            } else{
                return false;
            }
        };

        var start = 1,
            len = 10;
        function loadAndPlace(){
            $.ajax({
                url: 'http://platform.sina.com.cn/slide/album_tech',
                dataType:'jsonp',
                jsonp:'jsoncallback',
                data:{
                    app_key: '1271687855',
                    num: len,
                    page: start
                },
                success:function(ret){
                    if(ret && ret.status && ret.status.code === "0"){
                        start++;
                        place(ret.data);
                    }
                },
                error:function(){
                    console.log("get data error");
                }
            })
        };

        function place($node){
            var $ele = render($node);
                waterFall($ele);
        };
        function render(items){
        	var tpl = '',
        		$nodes;
        	for(var i = 0;i<items.length;i++){
        		tpl += '<li class="item">';
        		tpl += ' <a href="'+ items[i].url +'" class="link"><img src="' + items[i].img_url + '" alt=""></a>';
        		tpl += ' <h4 class="header">'+ items[i].short_name +'</h4>';
        		tpl += '<p class="desp">'+items[i].short_intro+'</p>';
        		tpl += '</li>';
        	}
        	$nodes = $(tpl);
        	$('#items-ct').append($nodes);
        	return $nodes;
        };

        //瀑布流
        var colSumHeight = [];
        function waterFall($ele){
            var nodeWidth = $ele.outerWidth(true),
                colNum = parseInt($('#items-ct').width()/nodeWidth);

            if(colSumHeight.length ==0){
                for (var i = 0; i < colNum; i++) {
                    colSumHeight[i] = 0;
                }
            };
            $ele.each(function(){
                var $cur = $(this);
                $cur.find('img').on('load', function(){
                    var idx = 0,
                        minSumHeight = colSumHeight[0];
                    for (var i = 0; i < colSumHeight.length; i++) {
                        if (colSumHeight[i] < minSumHeight) {
                            idx = i;
                            minSumHeight = colSumHeight[i];
                        }
                    }

                    $cur.css({
                        left: nodeWidth * idx,
                        top: minSumHeight,
                        opacity:1
                    });
                    colSumHeight[idx] += $cur.outerHeight(true);
                    $('#items-ct').height(Math.max.apply(null,colSumHeight));
                })
            })
        };
    }
    return loadmore;
})

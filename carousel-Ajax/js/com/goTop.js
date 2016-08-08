define(['jquery'], function($){
    var goTop = (function() {
            var $goTop = $('<div id="goTop">回到顶部</div>'),
                $body = $('body');

            function init() {
                $body.append($goTop);
                $(window).on('scroll', function() {
                    var offsetTop = $body.scrollTop();
                    if (offsetTop > 300) {
                        $goTop.show();
                    } else {
                        $goTop.hide();
                    }
                })
                $goTop.on('click', function() {
                    $body.animate({'scrollTop':0},500);
                })
            }
            return {
                init: init
            }
        })()
        return goTop;
})

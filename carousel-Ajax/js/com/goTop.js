define(['jquery'], function($){
    var goTop = (function() {
            var $goTop = $('<div id="goTop">回到顶部</div>'),
                $body = $('body');
            $goTop.data('unloaded', true);

            function init() {
                if ($goTop.data('unloaded')) {
                    $body.append($goTop);
                    $goTop.data('unloaded', false);
                }
                $(window).on('scroll', function() {
                    var offsetTop = $body.scrollTop();
                    if (offsetTop > 200) {
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

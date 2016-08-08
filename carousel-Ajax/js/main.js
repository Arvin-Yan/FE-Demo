require.config({
    baseUrl:'js/com',
    paths: {
        'jquery': '../lib/jquery'
    }
})
define(function(require){
    require(['jquery', 'carousel', 'loadmore', 'goTop'], function($, carousel, loadmore, goTop){
        $('.carousel').each(function(){
            new carousel($(this));
        });
        loadmore();
        goTop.init();
    })
})

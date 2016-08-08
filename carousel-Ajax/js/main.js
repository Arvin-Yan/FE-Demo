requirejs.config({
    baseUrl:'js/com',
    paths: {
        'jquery': '../lib/jquery'
    }
})

require(['jquery', 'carousel', 'loadmore', 'goTop'], function($, carousel, loadmore, goTop){
    $('.carousel').each(function(){
        new carousel($(this));
    });
    loadmore();
    goTop.init();
})

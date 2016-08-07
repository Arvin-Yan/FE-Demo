require.config({
    baseUrl:'js/com',
    paths: {
        'jquery': '../lib/jquery'
    }
})
define(function(require){
    require(['jquery', 'carousel', 'loadmore'], function($, carousel, loadmore){
        $('.carousel').each(function(){
            new carousel($(this));
        });
        loadmore();

    })
})

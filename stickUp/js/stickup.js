$.fn.stickup = function () {
	this.each(function() {
		var $nav = $(this),
			height = $nav.height(),
			width = $nav.width(),
			offsetTop = $nav.offset().top,
			offsetLeft = $nav.offset().left;

		var $clone = $nav.clone()
					.css("display","none")
					.hide()
					.text("clone")
					.insertBefore($nav);
		$(window).on('scroll', function(){
			var scrollTop = $(this).scrollTop();
			if(scrollTop >= offsetTop){
				if(!isFixed()){
					setFixed();
				}
			}else if(isFixed()){
					unsetFixed();
				}
		});
	 	function isFixed(){
	        return $nav.data('data-fixed');
	    }
        function setFixed(){
			$nav.data('data-fixed', true)
			    .css({
			           'position': 'fixed', 
			           'top': 0, 
			           'left': offsetLeft,
			           'width': width, 
			           'margin': 0,
			         });
			$clone.show();
   		}
   		function unsetFixed(){
		    $nav.data('data-fixed', false)
		        .removeAttr('style');
		    $clone.hide();
	    }
	})
}
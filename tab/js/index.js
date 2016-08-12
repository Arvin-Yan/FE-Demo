(function() {
	$('.ct .tabs li').on('click', function() {
		var $this = $(this);
		var idx = $this.index();
		$this.siblings().removeClass('active');
		$this.addClass('active');

		$this.parents('.ct').find('.panel').removeClass('active');
		$this.parents('.ct').find('.panel').eq(idx).addClass('active');
	});

	$('.ct .product').on('mouseenter', function() {
		 $(this).find('.cover').show();
	})
	$('.ct .product').on('mouseleave', function() {
		$(this).find('.cover').hide();
	})
})()
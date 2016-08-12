$.fn. carousel = function() {
			$(this).each(function() {
				var $this = $(this),
					$imgShow = $this.find('.img-show'),
					$item = $imgShow.children(),
					$pre = $this.find('.pre'),
					$next = $this.find('.next'),
					$bullet = $this.find('.bullet'),
					imgWidth = $item.width(),
					imgCount = $item.size(),
					imgRealCount,
					curIdx = 0,
					isAnimate = false;
					
				$imgShow.prepend($item.last().clone());
				$imgShow.append($item.first().clone());
				imgRealCount = imgCount + 2;
				$imgShow.css({left:0-imgWidth,width:imgRealCount*imgWidth});

				$next.on('click', function() {
					playNext();
				});
				$pre.on('click', function() {
					playPre();
				});
				$bullet.find('li').on('click', function() {			
					var idx = $(this).index();
					if(idx > curIdx){
						playNext(idx - curIdx);
					}
					if(idx < curIdx){
						playPre(curIdx - idx);
					}else{
						return;
					}
				})
				autoPlay() ;
				function autoPlay() {
					var clock = setInterval(function(){
						playNext();
					},3000)
				}
				function stopAuto(){
					clearInterval(clock);
				}
				function playNext(idx){
					
					var idx = idx || 1;
					if(!isAnimate){
						isAnimate = true;
						$imgShow.animate({'left': '-='+(imgWidth*idx)},function(){
							curIdx = (curIdx + idx)%imgCount;
							if(curIdx === 0){
								$imgShow.css({'left': 0-imgWidth});;
							}
							/*curIdx++;
							if(curIdx === imgCount){
								$imgShow.css({left: 0-imgWidth});;
								curIdx = 0;
							}*/
							isAnimate = false;
							setBullet();
						});
					}
				}
				function playPre(idx){
					var idx = idx || 1;
					if(!isAnimate){
						isAnimate = true;
						$imgShow.animate({left:'+='+(imgWidth*idx)},function() {
							curIdx = (imgCount + curIdx - idx)%imgCount;
							console.log("curIdx:",curIdx);
							if(curIdx == (imgCount -1)){
								$imgShow.css({left:0-imgWidth * imgCount});
							}
							isAnimate = false;
							setBullet();
						});
					};
				};
				function setBullet() {
					$bullet.children().removeClass('active')
						   .eq(curIdx).addClass('active');
				}
			})
		}
		$('.ct').carousel();
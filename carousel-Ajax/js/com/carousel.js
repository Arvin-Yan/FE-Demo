define(['jquery'],function($){
    function carousel($node){
		this.$node = $node;
		this.$imgShow = this.$node.find('.img-show');
		this.$item = this.$imgShow.children();
		this.$pre = this.$node.find('.pre');
		this.$next = this.$node.find('.next');
		this.$bullet = this.$node.find('.bullet');
		this.imgWidth = this.$item.width();
		this.imgCount = this.$item.size();
		this.imgRealCount = 0;
		this.curIdx = 0;
		this.isAnimate = false;

		this.$imgShow.prepend(this.$item.last().clone());
		this.$imgShow.append(this.$item.first().clone());
		this.imgRealCount = this.imgCount + 2;
		this.$imgShow.css({left:0-this.imgWidth,width:this.imgRealCount*this.imgWidth});
		this.bind();
		this.autoPlay();
    }
	carousel.prototype = {
		bind: function(){
			var $this = this;
			this.$next.on('click', function() {
				$this.playNext();
			});
			this.$pre.on('click', function(){
				$this.playPre();
			});
			this.$bullet.find('li').on('click', function(){
				var idx = $(this).index();
				if(idx > $this.curIdx){
					$this.playNext(idx - $this.curIdx);
				};
				if(idx < $this.curIdx){
					$this.playPre($this.curIdx - idx);
				}else{
					return;
				}
			})
		},
		playNext: function (idx) {
			var idx = idx || 1;
			var $this = this;
			if(!this.isAnimate){
				this.isAnimate = true;
				this.$imgShow.animate({'left': '-='+(this.imgWidth*idx)},function(){
					$this.curIdx = ($this.curIdx + idx)%($this.imgCount);
					if($this.curIdx === 0){
						$this.$imgShow.css({'left': 0-$this.imgWidth});;
					}
					$this.isAnimate = false;
					$this.setBullet();
				});
			}
		},
		playPre: function(idx){
			var idx = idx || 1,
				$this = this;
			if(!this.isAnimate){
				this.isAnimate = true;
				this.$imgShow.animate({left:'+='+(this.imgWidth*idx)},function() {
					$this.curIdx = ($this.imgCount + $this.curIdx - idx)%($this.imgCount);
					if($this.curIdx == ($this.imgCount -1)){
						$this.$imgShow.css({left:0-$this.imgWidth * $this.imgCount});
					}
					$this.isAnimate = false;
					$this.setBullet();
				});
			};
		},
		setBullet: function(){
			this.$bullet.children().removeClass('active')
				.eq(this.curIdx).addClass('active');
		},
		autoPlay: function(){
			var $this = this;
			setInterval(function(){
				$this.playNext();
			},3500)
		}
	}
    return carousel;
})

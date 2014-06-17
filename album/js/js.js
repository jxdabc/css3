$(function(){

	var $container = $('#container');
	var $zoom_frame = $('#zoom-frame');
	var $items = $('.item');

	var item_outter_width 		= $items.outerWidth(true);
	var item_outter_height 		= $items.outerHeight(true);
	var item_margin_left 		= parseInt($items.css('margin-left'));
	var item_margin_top			= parseInt($items.css('margin-top'));
	var item_border_left		= parseInt($items.css('border-left-width'));
	var item_border_top 		= parseInt($items.css('border-top-width'));


	var container_width 		= parseInt($container.width());
	var container_inner_width 	= $container.innerWidth();
	var container_inner_height 	= $container.innerHeight();
	var container_padding_left 	= parseInt($container.css('padding-left'));
	var container_padding_top 	= parseInt($container.css('padding-top'));

	var item_per_row = Math.floor(container_width / item_outter_width);

	$items
		.on('focus', function(){

			var $this = $(this);
			var $content = $this.find('.content');

			var position = itemRealPosition($this);

			$content.css({
				'width' 	: container_inner_width,
				'height' 	: container_inner_height,
				'left'		: -position.left,
				'top' 		: -position.top,
			});
			$content.addClass('zoom-in');

		})
		.on('blur', function(){
			var $this = $(this);
			var $content = $this.find('.content');

			$content.css({
				'width' 	: '',
				'height' 	: '',
				'left'		: '',
				'top'		: '',
			});
			$content.removeClass('zoom-in');
		})
		.on('webkitAnimationEnd animationend', function () {
			$(this).css('animation', 'none');
		});

	function itemRealPosition($item) {
		
		var index = Array.prototype.indexOf.call($items, $item[0]);

		var row = Math.floor(index / item_per_row);
		var col = index % item_per_row;



		return {
			'left' 	: col * item_outter_width + container_padding_left + 
				+ item_margin_left + item_border_left,
			'top' 	: row * item_outter_height + container_padding_top + 
				+ item_margin_top + item_border_top,
		}
	}

});
$(function(){

	viewCheck();
	$(window).resize(viewCheck);

	$('.carousel').flexslider({
		prevText: "",
		nextText: "",
		animation: "slide"
	});

	$('.card-carousel.big').flexslider({
		prevText: "",
		nextText: "",
		animation: "slide",
		controlNav: false,
		animationLoop: false,
		itemWidth: 201,
		move: 1,
		itemMargin: 0
	});

	$('.card-carousel.sml').flexslider({
		prevText: "",
		nextText: "",
		animation: "slide",
		controlNav: false,
		animationLoop: false,
		itemWidth: 321,
		move: 1,
		itemMargin: 0
	});

	$('.looked-slider').flexslider({
		prevText: "",
		nextText: "",
		animation: "slide",
		controlNav: false,
		animationLoop: true,
		itemWidth: 101,
		move: 1,
		itemMargin: 0
	});

	if ( $('select').size() ) $('select').selectbox();

	$('.filter-list').mCustomScrollbar();

	$('.js-tab-wrap').on('click', '[data-tab-link]', function(e){
		e.preventDefault();
		var $t = $(this);

		if ( !$t.hasClass('active') ){
			var ind = $t.data('tab-link'),
				$wrap = $t.closest('.js-tab-wrap'),
				$link = $wrap.find('[data-tab-link]'),
				$item = $wrap.find('[data-tab-item]'),
				$itemActive = $wrap.find('[data-tab-item=' + ind + ']');

			$link.filter('.active').removeClass('active');
			$item.filter('.active').removeClass('active');
			$t.addClass('active');
			$itemActive.addClass('active');
		}
	});

	$('.menu_dropdown .menu-head').click(function(){
		$(this).closest('.menu').find('.menu-body').slideToggle(200);
	});



	$('.search-category__targ').click(function(){
		$(this).closest('.search-category').toggleClass('open-list')
	});

	$('.search-link').click(function(e){
		e.preventDefault();
		$('.search-link').filter('.active').removeClass('active');
		$(this).addClass('active')
			.closest('.search-category')
			.removeClass('open-list')
			.find('.search-category__targ')
			.text($(this).text());
	});







	$('.slider-line').each(function(){

		var $this = $(this);
		var $wrap = $this.closest('.filter-inner');

		var time = $this.hasClass('slider-time') ? true : false;

		var rangeMin = $this.data('range-min'),
			rangeMax = $this.data('range-max'),
			valMin = $this.data('val-min') || rangeMin,
			valMax = $this.data('val-max') || rangeMax,
			$inputFrom = $wrap.find('.i-from'),
			$inputTo = $wrap.find('.i-to'),
			$sliderFrom = $wrap.find('.slider-line__from'),
			$sliderTo = $wrap.find('.slider-line__to');

		$inputFrom.val(valMin);
		$inputTo.val(valMax);
		$sliderFrom.text(valMin);
		$sliderTo.text(valMax);

		$this.slider({
			min: rangeMin,
			max: rangeMax,
			values: [valMin, valMax],
			range: true,
			create: function(event, ui){},
			slide: function(event, ui){
				$sliderFrom.text($this.slider('values', 0));
				$sliderTo.text($this.slider('values', 1));
				$inputFrom.val($this.slider('values', 0));
				$inputTo.val($this.slider('values', 1));
			},
			stop: function(event, ui) {
				$sliderFrom.text($this.slider('values', 0));
				$sliderTo.text($this.slider('values', 1));
				$inputFrom.val($this.slider('values', 0));
				$inputTo.val($this.slider('values', 1));
			}
		});

	});


	$('.filter_slider input').on('change', function(){

		var $this = $(this);

		if ( $this.val().match(/[^0-9]/g) ) {
			var _newVal = $this.val().replace(/[^0-9]/g, '');
			$this.val(_newVal);
		}

		var $wrap = $this.closest('.filter_slider');
		var $slider = $wrap.find('.slider-line');

		var max = $slider.data('range-max');

		var iMin = $wrap.find('.i-from');
		var iMax = $wrap.find('.i-to');

		var val1 = iMin.val();
		var val2 = iMax.val();

		if ( $this.hasClass('i-from') ){
			if(parseInt(val1) > parseInt(val2)){
				val1 = val2;
				iMin.val(val1);
			}
			$slider.slider('values', 0, val1);
		} else if ( $this.hasClass('i-to') ){
			if (val2 > max) {
				val2 = max;
				iMax.val(max);
			}

			if(parseInt(val1) > parseInt(val2)){
				val2 = val1;
				iMax.val(val2);
			}

			$slider.slider('values', 1, val2);
		}
	});

	filterCheck();

	$('.filter-item input').change(function(){
		filterCheck();
	});

	$(document).on('click', '.js-filter-clear', function(){
		$(this).closest('.filter').find('input').prop('checked', false);
		filterCheck();
	}).on('click', '.js-filter-clear-all', function(){
		$('.filter-item').find('input[type=checkbox]').prop('checked', false);
		filterCheck();
	}).on('click', '.tooltip', function(e){

		e.stopPropagation();
		e.preventDefault();

		var $this = $(this);
		var tooltip = {
			title: $this.data('tooltip-title'),
			text: $this.data('tooltip-text'),
			link: $this.data('tooltip-link')
		};
		var title = tooltip.title ? '<div class="tooltip-popup__title">' + tooltip.title + '</div>' : '';
		var text = tooltip.text ? '<div class="tooltip-popup__text">' + tooltip.text + '</div>' : '';
		var link = tooltip.link ? '<div class="tooltip-popup__more"><a href="' + tooltip.link + '">подробнее</a></div>' : '';

		var top = $this.offset().top;
		var left = $this.offset().left;

		if ( $(window).width() - e.pageX < 300 ){
			left -= 240;
		}

		$('<div class="tooltip-popup">' +
		title +
		text +
		link +
		'<div class="tooltip-popup__close"></div>' +
		'</div>').appendTo('body').css({top: top + 'px', left: left + 'px'}).show();

	}).on('click', '.tooltip-popup__close', function(){
		$(this).parents('.tooltip-popup').remove();
	}).on('click', function(e){
		if ( $('.tooltip-popup').size() ){
			var target = e && e.target || event.srcElement;
			if ( $(target).closest('.tooltip-popup').length ) return;
			$('.tooltip-popup').remove();
		}
	}).on('click', '.product-left .preview-item', function(e){
		e.preventDefault();
		var $t = $(this);
		var $p = $t.closest('.product-left').find('.img img');
		if (!$t.hasClass('active')){
			$t.addClass('active')
				.siblings()
				.filter('.active')
				.removeClass('active');
			$p.attr('src', $t.attr('href'));
		}
	}).on('click', '.product-center .spec .kind-item', function(e){
		e.preventDefault();
		var $t = $(this);
		if (!$t.hasClass('active')){
			$t.addClass('active')
				.siblings()
				.filter('.active')
				.removeClass('active');
		}
	});

	$('.js-amount-val-down').click(function(){
		var $field = $(this).closest('.amount-val').find('input');
		if ( $field.val() > 0 ){
			$field.val(+$field.val()-1);
			prodAmountPrice();
		}
	});

	$('.js-amount-val-up').click(function(){
		var $field = $(this).closest('.amount-val').find('input');
		$field.val(+$field.val()+1);
		prodAmountPrice();
	});

	$('.js-amount-val-clear').click(function(){
		var $field = $(this).closest('.amount').find('input');
		$field.val(0);
		prodAmountPrice();
	});

	prodAmountPrice();

	$('.feedback-popup__close').click(function(){
		$(this).closest('.feedback-popup').hide();
	});
	$('.feedback-popup .submit .btn').click(function(){
		var $this = $(this);
		var requiredInput = $this.closest('.feedback-popup').find('input.required');
		requiredInput.removeClass('error');
		if ( requiredInput.size() ){
			requiredInput.each(function(){
				if ( !$(this).val() ){
					$(this).addClass('error');
				}
			});
			return false;
		}
	});

	$('.header-panel__item_call').click(function(e){
		$('.feedback-popup').hide();
		var $popup = $('.feedback-popup_call');
		$popup.css({
			top: e.pageY + 10 + 'px',
			left: e.pageX - 300 + 'px'
		}).show();
	});

	$('.header-panel__item_dim').click(function(e){
		$('.feedback-popup').hide();
		var $popup = $('.feedback-popup_dim');
		$popup.css({
			top: e.pageY + 10 + 'px',
			left: e.pageX - 300 + 'px'
		}).show();
	});

	var stickerScrollAnimate = false;

	$(window).scroll(function(){
		clearTimeout(stickerScrollAnimate);

		stickerScrollAnimate = setTimeout(function(){
			stickerScroll();
			console.log('scrolled')
		}, 300);
	});

	$('.sticker-item_up').click(function(e){
		e.preventDefault();
		$('html,body').animate({scrollTop:0}, 300);
	});

});


function stickerScroll(){
	var sTop = $(window).scrollTop();
	var $sticker = $('.sticker');
	if ( !Modernizr.csstransitions ){
		$sticker.stop(true).animate({top: sTop}, 300);
	} else {
		$sticker.css({top: sTop});
	}
}

function prodAmountPrice(){
	$('.product-center .amount').each(function(){
		var val = $(this).find('input').val();
		var price = $(this).data('val');
		var $total = $(this).find('.amount-result .val');

		if ( price ){
			$total.text(declOfNumFormat(val * price));
			if ( +val == 0 ){
				$(this).closest('.amount').addClass('empty');
			} else {
				$(this).closest('.amount').removeClass('empty');
			}
		}
	});
}


function viewCheck(){
	var w = $(window).width();
	var CHECK = 1300;
	var wrap = $('html');

	if (w > CHECK && !wrap.hasClass('wide-view')){
		wrap.removeClass('narrow-view');
		wrap.addClass('wide-view');
	} else if (w <= CHECK && !wrap.hasClass('narrow-view')){
		wrap.removeClass('wide-view');
		wrap.addClass('narrow-view');
	}
}

function filterCheck(){
	var box = $('.filter-list');

	box.each(function(){
		var t = $(this);
		var i = t.find('input[type=checkbox]').filter(':checked');
		var c = t.prev('.filter-clear');
		if (i.length && !c.length){
			t.before('<div class="filter-clear"><span class="js-filter-clear">сбросить фильтр</span></div>')
		} else if ( !i.length && c.length ){
			c.remove();
		}
	})
}

function declOfNumFormat(nStr){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ' ' + '$2');
	}
	return x1 + x2;
}
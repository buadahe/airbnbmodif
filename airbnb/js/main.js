//(function() {
//	var support = { animations : Modernizr.cssanimations },
//		animEndEventNames = {
//			'WebkitAnimation' : 'webkitAnimationEnd',
//			'OAnimation' : 'oAnimationEnd',
//			'msAnimation' : 'MSAnimationEnd',
//			'animation' : 'animationend'
//		},
//		// animation end event name
//		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
//		effectSel = document.getElementById( 'fxselect' ),
//		component = document.getElementById( 'component' ),
//		items = component.querySelector( 'ul.itemwrap' ).children,
//		current = 0,
//		itemsCount = items.length,
//		nav = component.querySelector( 'nav' ),
//		navNext = nav.querySelector( '.next' ),
//		navPrev = nav.querySelector( '.prev' ),
//		isAnimating = false;
//
//	function init() {
//		showNav();
//		changeEffect();
//		navNext.addEventListener( 'click', function( ev ) { ev.preventDefault(); navigate( 'next' ); } );
//		navPrev.addEventListener( 'click', function( ev ) { ev.preventDefault(); navigate( 'prev' ); } );
//		effectSel.addEventListener( 'change', changeEffect );
//	}
//
//	function hideNav() {
//		nav.style.display = 'none';
//	}
//
//	function showNav() {
//		nav.style.display = 'block';
//	}
//
//	function changeEffect() {
//		component.className = component.className.replace(/\bfx.*?\b/g, '');
//		classie.addClass( component,'fxPressAway');
//	}
//
//	$(function(){
//		$('#menu').slicknav();
//	});
//
//	function navigate( dir ) {
//		//if( isAnimating || !effectSel.selectedIndex ) return false;
//		isAnimating = true;
//		var cntAnims = 0;
//
//
//		var currentItem = items[ current ];
//
//		if( dir === 'next' ) {
//			current = current < itemsCount - 1 ? current + 1 : 0;
//		}
//		else if( dir === 'prev' ) {
//			current = current > 0 ? current - 1 : itemsCount - 1;
//		}
//
//		var nextItem = items[ current ];
//
//		var onEndAnimationCurrentItem = function() {
//			this.removeEventListener( animEndEventName, onEndAnimationCurrentItem );
//			classie.removeClass( this, 'current' );
//			classie.removeClass( this, dir === 'next' ? 'navOutNext' : 'navOutPrev' );
//			++cntAnims;
//			if( cntAnims === 2 ) {
//				isAnimating = false;
//			}
//		}
//
//		var onEndAnimationNextItem = function() {
//			this.removeEventListener( animEndEventName, onEndAnimationNextItem );
//			classie.addClass( this, 'current' );
//			classie.removeClass( this, dir === 'next' ? 'navInNext' : 'navInPrev' );
//			++cntAnims;
//			if( cntAnims === 2 ) {
//				isAnimating = false;
//			}
//		}
//
//		if( support.animations ) {
//			currentItem.addEventListener( animEndEventName, onEndAnimationCurrentItem );
//			nextItem.addEventListener( animEndEventName, onEndAnimationNextItem );
//		}
//		else {
//			onEndAnimationCurrentItem();
//			onEndAnimationNextItem();
//		}
//
//		classie.addClass( currentItem, dir === 'next' ? 'navOutNext' : 'navOutPrev' );
//		classie.addClass( nextItem, dir === 'next' ? 'navInNext' : 'navInPrev' );
//	}
//
//	init();
//})();

// Starrr plugin (https://github.com/dobtco/starrr)
var __slice = [].slice;

(function($, window) {
	var Starrr;

	Starrr = (function() {
		Starrr.prototype.defaults = {
			rating: void 0,
			numStars: 5,
			change: function(e, value) {}
		};

		function Starrr($el, options) {
			var i, _, _ref,
					_this = this;

			this.options = $.extend({}, this.defaults, options);
			this.$el = $el;
			_ref = this.defaults;
			for (i in _ref) {
				_ = _ref[i];
				if (this.$el.data(i) != null) {
					this.options[i] = this.$el.data(i);
				}
			}
			this.createStars();
			this.syncRating();
			this.$el.on('mouseover.starrr', 'span', function(e) {
				return _this.syncRating(_this.$el.find('span').index(e.currentTarget) + 1);
			});
			this.$el.on('mouseout.starrr', function() {
				return _this.syncRating();
			});
			this.$el.on('click.starrr', 'span', function(e) {
				return _this.setRating(_this.$el.find('span').index(e.currentTarget) + 1);
			});
			this.$el.on('starrr:change', this.options.change);
		}

		Starrr.prototype.createStars = function() {
			var _i, _ref, _results;

			_results = [];
			for (_i = 1, _ref = this.options.numStars; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--) {
				_results.push(this.$el.append("<span class='glyphicon .glyphicon-star-empty'></span>"));
			}
			return _results;
		};

		Starrr.prototype.setRating = function(rating) {
			if (this.options.rating === rating) {
				rating = void 0;
			}
			this.options.rating = rating;
			this.syncRating();
			return this.$el.trigger('starrr:change', rating);
		};

		Starrr.prototype.syncRating = function(rating) {
			var i, _i, _j, _ref;

			rating || (rating = this.options.rating);
			if (rating) {
				for (i = _i = 0, _ref = rating - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
					this.$el.find('span').eq(i).removeClass('glyphicon-star-empty').addClass('glyphicon-star');
				}
			}
			if (rating && rating < 5) {
				for (i = _j = rating; rating <= 4 ? _j <= 4 : _j >= 4; i = rating <= 4 ? ++_j : --_j) {
					this.$el.find('span').eq(i).removeClass('glyphicon-star').addClass('glyphicon-star-empty');
				}
			}
			if (!rating) {
				return this.$el.find('span').removeClass('glyphicon-star').addClass('glyphicon-star-empty');
			}
		};

		return Starrr;

	})();
	return $.fn.extend({
		starrr: function() {
			var args, option;

			option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
			return this.each(function() {
				var data;

				data = $(this).data('star-rating');
				if (!data) {
					$(this).data('star-rating', (data = new Starrr($(this), option)));
				}
				if (typeof option === 'string') {
					return data[option].apply(data, args);
				}
			});
		}
	});
})(window.jQuery, window);

$(function() {
	return $(".starrr").starrr();
});

$( document ).ready(function() {

	$('#hearts').on('starrr:change', function(e, value){
		$('#count').html(value);
	});

	$('#hearts-existing').on('starrr:change', function(e, value){
		$('#count-existing').html(value);
	});

	$(window).scroll(function () {

					function checkWidth() {
						var windowSize = $(window).width();

						if (windowSize > 768) {
							if (jQuery(this).scrollTop() > 400) {

								$('.navbar').addClass('navbar-scrolled-down');
								//  $('.logo').css({'z-index':'99', 'position':'fixed', 'top':'11px'});
							} else {
								$('.navbar').removeClass('navbar-scrolled-down');
								//  $('.logo').css({'z-index':'99', 'position':'absolute', 'top':'-45px'});
							}
						}

					}

					// Execute on load
					checkWidth();
					// Bind event listener
					$(window).resize(checkWidth);

				});
});

$( document ).ready(function() {
	$("#price-range-low").formatCurrency({ colorize:true, region: 'id-ID' });
	$("#price-range-high").formatCurrency({ colorize:true, region: 'id-ID' });
	$(".sidebar").scroll(function () {
		var scroll = $(this).scrollTop();
		if(scroll > 350){
			$("#filtersign").addClass("stuck");
		}else{
			$("#filtersign").removeClass("stuck");
		}
	});
});

$(function() {
	$('#review-1').barrating({
		theme: 'bootstrap-stars'
	});
	$('#review-2').barrating({
		theme: 'bootstrap-stars'
	});
	$('#review-3').barrating({
		theme: 'bootstrap-stars'
	});
	$('#review-4').barrating({
		theme: 'bootstrap-stars'
	});
});

function filters(){
	$('.sidebar').addClass('filters-open');
	$('.filters').removeClass('collapse');
}

function filtersoff(){
	$('.sidebar').removeClass('filters-open');
	$('.filters').addClass('collapse');
}

$("#ex2").slider({});
$("#ex2").on("slide", function(slideEvt) {
	var val = new String(slideEvt.value);
	var low = val.split(",");
	$("#price-range-low").text(low[0]).formatCurrency({ colorize:true, region: 'id-ID' });
	$("#price-range-high").text(low[1]).formatCurrency({ colorize:true, region: 'id-ID' });
});


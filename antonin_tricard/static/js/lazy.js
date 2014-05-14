// Perfect masonry

$.Isotope.prototype._getMasonryGutterColumns = function() {
	var gutter = this.options.masonry && this.options.masonry.gutterWidth || 0;
	containerWidth = this.element.width();
	this.masonry.columnWidth = this.options.masonry && this.options.masonry.columnWidth ||
	this.$filteredAtoms.outerWidth(true) ||
	containerWidth;
	this.masonry.columnWidth += gutter;
	this.masonry.cols = Math.floor((containerWidth + gutter) / this.masonry.columnWidth);
	this.masonry.cols = Math.max(this.masonry.cols, 1);
};

$.Isotope.prototype._masonryReset = function() {
	this.masonry = {};
	this._getMasonryGutterColumns();
	var i = this.masonry.cols;
	this.masonry.colYs = [];
	while (i--) {
		this.masonry.colYs.push(0);
	}
};

$.Isotope.prototype._masonryResizeChanged = function() {
	var prevSegments = this.masonry.cols;
	this._getMasonryGutterColumns();
	return (this.masonry.cols !== prevSegments);
};

$(document).ready(function(){

	var $isocontainer = $('#isocontainer');
	var $layouts = 0;
	var $win = $(window);

	// Animate signature to show contact infos
	var signature = $('#masthead');
	var myheader = $('#myheader');
	myheader.height($win.height());
	var signature_margin = myheader.height() / 2 - signature.height() / 2;
	signature.css("margin-top", signature_margin);

	$('#contact_button').click(function () {
		signature.animate({
				'margin-top': 0
		}, {
			duration: 500,
			complete: function () {
				$("#contact_text").animate({
						'opacity': 1.0
				}, 500);
			}
		});
	});

	// Make sure lazy load works on filtering
	var hollaback = function () {
		console.log("triggered scroll !");
		$win.trigger("scroll");
	}

	$("img").lazyload({
			event : 'scroll',
			effect : 'fadeIn',
			placeholder: '/static/img/placeholder.png',
			appear: function(){
			},
			failure_limit: Math.max($("img").length - 1, 0)
	});

	$isocontainer.isotope({ filter: ".EVERYDAY" });
	// Filtering logic
	$('#filters').on( 'click', 'button', function() {
		var filterValue = $( this ).attr('data-filter');
		$isocontainer.isotope({ filter: filterValue });
	});

	$('.button-group').each( function( i, buttonGroup ) {
		var $buttonGroup = $( buttonGroup );
		$buttonGroup.on( 'click', 'button', function() {
			$buttonGroup.find('.is-checked').removeClass('is-checked');
			$( this ).addClass('is-checked');
		});
	});

	var relayout = function () {
		$isocontainer.isotope('reLayout');
	}

	var changeWidth = function () {
		var $oldWidth = $isocontainer.width();
		var $newWidth = 400;
		var $winWidth = $(window).width();
		while (true) {
			if (($newWidth + 410) > $winWidth)
				break;
			$newWidth += 410;
			if (($newWidth > 900))
				break;
		}
		if ($oldWidth != $newWidth) {
			$isocontainer.width($newWidth);
			setTimeout( relayout, 1000 );
		}
	}

	$(window).resize(function(){
		changeWidth();
		console.log($('#nav').offset().top);
		return true;
	});

	changeWidth();

	$isocontainer.isotope({
			itemSelector : '.photo',
			containerClass: 'isotope',
			masonry: {
				columnWidth: 400,
				gutterWidth: 10
			},
			onLayout: function( $elems ) {
				if ($layouts == 1) { // Don't allow for transition on first layout
					$('.isotope').addClass('isotope-ready');
				}
				$layouts += 1;
				console.log("laid out !" + $layouts);
				$win.trigger("scroll");
				setTimeout( hollaback, 800 );
			}
	});

	$('#navbar-wrapper').height($("#nav").height());

	$('#nav').affix({
			offset: { 
				top: function() {
					return $('#myheader').height();
				}
			}
	});

	// when Photos is clicked
	$("#scroll_to_nav").click(function (event) {
		event.preventDefault();
		//calculate destination place
		var dest = 0;
		if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
			dest = $(document).height() - $(window).height();
		} else {
			dest = $(this.hash).offset().top;
		}
		//                                    //go to destination
		$('html,body').animate({
				scrollTop: dest
		}, 800, 'swing');
	});	    

});

docReady( function() {
	var container = document.querySelector('.packery');
	var pckry = new Packery( container, {
			// options
			gutter: 10,
			columnWidth: 290
	});

	eventie.bind( container, 'click', function( event ) {
		// don't proceed if item was not clicked on
		var target = event.target;
		if ( !classie.has( target, 'item' ) ) {
			return;
		}

		var isGigante = classie.has( target, 'gigante' );
		classie.toggleClass( target, 'gigante' );
		if ( isGigante ) {
			// if shrinking, just layout
			pckry.layout();
		} else {
			// if expanding, fit it
			pckry.fit( target );
		}
	});
});

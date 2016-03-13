$( function () {
	var number = 0,
		$number = $( '<p>' ),
		$body = $( 'body' ).empty().append( $number );

	function incrementForever( secs ) {
		var i, deferred = $.Deferred();

		i = setInterval( function () {
			number += 1;
			deferred.notify( number );

			if ( number >= Infinity ) {
				deferred.resolve();
				clearInterval( i );
			}

			if ( number < 0 ) {
				deferred.reject( 'How did we start subtracting???' );
				clearInterval( i );
			}
		}, secs * 1000 );

		return deferred.promise();
	}

	incrementForever( 1 ).progress( function ( number ) {
		$number.text( number );
	} );
} );

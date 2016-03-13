$( function () {
	var number = 0,
		$number = $( '<p>' ).text( number ),
		$body = $( 'body' ).empty().append( $number );

	function incrementAfter( secs ) {
		var deferred = $.Deferred();

		setTimeout( function () {
			number += 1;
			deferred.resolve( number );
		}, secs * 1000 );

		return deferred.promise();
	}

	function incrementForever( secs ) {
		incrementAfter( secs ).done( function ( num ) {
			$number.text( num );
			incrementForever( secs );
		} );
	}

	incrementForever( 1 );
} );

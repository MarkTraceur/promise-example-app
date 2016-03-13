$( function () {
	var number = 0,
		$number = $( '<p>' ).text( number ),
		$body = $( 'body' ).empty().append( $number );

	function incrementAfter( secs, cb ) {
		setTimeout( function () {
			number += 1;
			cb();
		}, secs * 1000 );
	}

	function incrementForever( secs ) {
		incrementAfter( secs, function () {
			$number.text( number );
			incrementForever( secs );
		} );
	}

	incrementForever( 1 );
} );

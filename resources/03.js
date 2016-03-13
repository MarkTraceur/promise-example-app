$( function () {
	var $list = $( '#songs' ),
		$tpl = $list.find( '.song' ).detach();

	function getSong( id ) {
		return $.get( {
			url: '/songs/' + id
		} );
	}

	function addSong( song ) {
		var $song = $tpl.clone();

		$song.find( '.title' ).text( song.title );
		$song.find( '.artist, .title-sep' ).hide();
		$song.find( '.album, .artist-sep' ).hide();

		$list.append( $song );
	}

	getSong( 1 ).done( function ( song ) {
		addSong( song );
	} ).fail( function ( error ) {
		console.log( 'Could not fetch song: ' + error.toString() );
	} );
} );

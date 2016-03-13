$( function () {
	var $list = $( '#songs' ),
		$tpl = $list.find( '.song' ).detach();

	function getSong( id, cb ) {
		$.get( {
			url: '/songs/' + id,
			success: function ( data ) {
				cb( data );
			}
		} );
	}

	function addSong( song ) {
		var $song = $tpl.clone();

		$song.find( '.title' ).text( song.title );
		$song.find( '.artist, .title-sep' ).hide();
		$song.find( '.album, .artist-sep' ).hide();

		$list.append( $song );
	}

	getSong( 1, function ( song ) {
		addSong( song );
	} );
} );

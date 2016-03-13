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

	function getAlbum( id, cb ) {
		$.get( {
			url: '/albums/' + id,
			success: function ( data ) {
				cb( data );
			}
		} );
	}

	function getArtist( id, cb ) {
		$.get( {
			url: '/artists/' + id,
			success: function ( data ) {
				cb( data );
			}
		} );
	}

	function addSong( song ) {
		var $song = $tpl.clone();

		$song.find( '.title' ).text( song.title );
		$song.find( '.artist' ).text( song.artist );
		$song.find( '.album' ).text( song.album );

		$list.append( $song );
	}

	getSong( 1, function ( song ) {
		getAlbum( song.AlbumId, function ( album ) {
			song.album = album.title;

			getArtist( album.ArtistId, function ( artist ) {
				song.artist = artist.name;
				addSong( song );
			} );
		} );
	} );
} );

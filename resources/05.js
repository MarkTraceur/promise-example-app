$( function () {
	var $list = $( '#songs' ),
		$tpl = $list.find( '.song' ).detach();

	function getSong( id ) {
		return $.get( {
			url: '/songs/' + id
		} );
	}

	function getAlbum( id ) {
		return $.get( {
			url: '/albums/' + id
		} );
	}

	function getArtist( id ) {
		return $.get( {
			url: '/artists/' + id
		} );
	}

	function addSong( song ) {
		var $song = $tpl.clone();

		$song.find( '.title' ).text( song.title );

		if ( song.artist ) {
			$song.find( '.artist' ).text( song.artist );
		} else {
			$song.find( '.artist, .title-sep' ).hide();
		}

		if ( song.album ) {
			$song.find( '.album' ).text( song.album );
		} else {
			$song.find( '.album, .artist-sep' ).hide();
		}

		$list.append( $song );
	}

	getSong( 1 ).then( function ( song ) {
		return getAlbum( song.AlbumId );
	} ).then( function ( album ) {
		return getArtist( album.ArtistId );
	} ).then( function ( artist ) {
		return { artist: artist.name };
	} ).done( function ( song ) {
		addSong( song );
	} ).fail( function ( error ) {
		console.log( 'Could not fetch song: ' + error.toString() );
	} );
} );

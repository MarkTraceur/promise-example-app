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
		$song.find( '.artist' ).text( song.artist );
		$song.find( '.album' ).text( song.album );

		$list.append( $song );
	}

	getSong( 1 ).then( function ( song ) {
		return getAlbum( song.AlbumId ).then( function ( album ) {
			song.album = album.title;

			return getArtist( album.ArtistId ).then( function ( artist ) {
				song.artist = artist.name;
				return song;
			} );
		} );
	} ).done( function ( song ) {
		addSong( song );
	} ).fail( function ( error ) {
		console.log( 'Could not fetch song: ' + error.toString() );
	} );
} );

$( function () {
	var cache = {
			song: {},
			album: {},
			artist: {}
		},
		$list = $( '#songs' ),
		$tpl = $list.find( '.song' ).detach();

	function getSong( id ) {
		return getSongInfo( id )
			.then( function ( song ) {
				return getAlbum( song.AlbumId ).then( function ( album ) {
					song.album = album.title;

					return getArtist( album.ArtistId ).then( function ( artist ) {
						song.artist = artist.name;
						return song;
					} );
				} );
			} );
	}

	function getSongInfo( id ) {
		if ( !cache.song[id] ) {
			cache.song[id] = $.get( {
				url: '/songs/' + id
			} );
		}

		return cache.song[id];
	}

	function getAlbum( id ) {
		if ( !cache.album[id] ) {
			cache.album[id] = $.get( {
				url: '/albums/' + id
			} );
		}

		return cache.album[id];
	}

	function getArtist( id ) {
		if ( !cache.artist[id] ) {
			cache.artist[id] = $.get( {
				url: '/artists/' + id
			} );
		}

		return cache.artist[id];
	}

	function addSong( song ) {
		var $song = $tpl.clone();

		$song.find( '.title' ).text( song.title );
		$song.find( '.artist' ).text( song.artist );
		$song.find( '.album' ).text( song.album );

		$list.append( $song );
	}

	$.when( getSong( 1 ), getSong( 2 ) ).done( function ( song1, song2 ) {
		addSong( song1 );
		addSong( song2 );
	} ).fail( function ( error ) {
		console.log( 'Could not fetch song: ' + error.toString() );
	} );
} );

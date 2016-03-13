exports.register = function ( app, models ) {
	console.log( 'Registering /songs...' );

	app.get( /\/songs\/(\d+)/, function ( req, res ) {
		var songid = req.params[0];

		models.Song.find( songid ).then( function ( song ) {
			res.status( 200 ).json( song );
		}, function ( err ) {
			res.status( 500 ).end( err.toString() );
		} );
	} );

	app.post( '/songs', function ( req, res ) {
		var title = req.param( 'title' ),
			album = req.param( 'AlbumId' );

		models.Song.create( {
			title: title
		} ).then( function ( song ) {
			return song.setAlbum( album ).then( function () {
				res.status( 200 ).json( song );
			} );
		}, function ( err ) {
			res.status( 500 ).end( err.toString() );
		} );
	} );
};

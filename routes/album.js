exports.register = function ( app, models ) {
	console.log( 'Registering /albums...' );

	app.get( /\/albums\/(\d+)/, function ( req, res ) {
		var albumid = req.params[0];

		models.Album.find( albumid ).then( function ( album ) {
			res.status( 200 ).json( album );
		}, function ( err ) {
			res.status( 500 ).end( err.toString() );
		} );
	} );

	app.post( '/albums', function ( req, res ) {
		var title = req.param( 'title' ),
			artist = req.param( 'ArtistId' );

		models.Album.create( {
			title: title
		} ).then( function ( album ) {
			return album.setArtist( artist ).then( function () {
				res.status( 200 ).json( album );
			} );
		}, function ( err ) {
			res.status( 500 ).end( err.toString() );
		} );
	} );
};

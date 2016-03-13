exports.register = function ( app, models ) {
	console.log( 'Registering /artists...' );

	app.get( /\/artists\/(\d+)/, function ( req, res ) {
		var artistid = req.params[0];

		models.Artist.find( artistid ).then( function ( artist ) {
			res.status( 200 ).json( artist );
		}, function ( err ) {
			res.status( 500 ).end( err.toString() );
		} );
	} );

	app.post( '/artists', function ( req, res ) {
		var name = req.param( 'name' );

		models.Artist.create( {
			name: name
		} ).then( function ( artist ) {
			res.status( 200 ).json( artist );
		}, function ( err ) {
			res.status( 500 ).end( err.toString() );
		} );
	} );
};

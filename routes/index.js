var fs = require( 'fs' ),
	path = require( 'path' ),
	routes = [];

fs
	.readdirSync( __dirname )
	.filter( function ( file ) {
		return ( file.indexOf( '.' ) !== 0 ) && ( file !== 'index.js' );
	} )
	.forEach( function ( file ) {
		routes.push( require( path.join( __dirname, file ) ) );
	} );

module.exports = routes;


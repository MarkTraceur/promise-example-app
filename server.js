var server, i,

	/* requires */
	express = require( 'express' ),
	bodyParser = require( 'body-parser' ),

	models = require( './models' ),
	routes = require( './routes' ),

	app = express();

app.set( 'views', './templates' );
app.set( 'view engine', 'jade' );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded() );
app.use( '/static', express.static( __dirname + '/resources' ) );

app.get( '/', function ( req, res ) {
	res.render( 'index', { script: req.query.useScript } );
} );

for ( i = 0; i < routes.length; i++ ) {
	routes[i].register( app, models );
}

models.sequelize.sync().then( function () {
	server = app.listen( 8888, function () {
		console.log( 'Listening on port %d', server.address().port );
	} );
} );

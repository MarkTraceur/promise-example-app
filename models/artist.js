module.exports = function ( sequelize, DataTypes ) {
	var Artist = sequelize.define( 'Artist', {
		name: {
			type: DataTypes.STRING
		}
	}, {
		classMethods: {
			associate: function ( models ) {
				Artist.hasMany( models.Album );
			}
		}
	} );

	return Artist;
};

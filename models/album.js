module.exports = function ( sequelize, DataTypes ) {
	var Album = sequelize.define( 'Album', {
		title: {
			type: DataTypes.STRING
		}
	}, {
		classMethods: {
			associate: function ( models ) {
				Album.hasMany( models.Song );
				Album.belongsTo( models.Artist );
			}
		}
	} );

	return Album;
};

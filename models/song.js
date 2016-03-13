module.exports = function ( sequelize, DataTypes ) {
	var Song = sequelize.define( 'Song', {
		title: DataTypes.STRING
	}, {
		classMethods: {
			associate: function ( models ) {
				Song.belongsTo( models.Album );
			}
		}
	} );

	return Song;
};

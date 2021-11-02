module.exports = (sequelize, Sequelize) => {
	const GamesUsers = sequelize.define("games_users", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		gameId: {
			type: Sequelize.INTEGER,
		},
		userId: {
			type: Sequelize.INTEGER,
		},
	})

	return GamesUsers
}

module.exports = (sequelize, Sequelize) => {
	const Game = sequelize.define("games", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
		},
		name: {
			type: Sequelize.STRING,
		},
	})

	return Game
}

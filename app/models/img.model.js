module.exports = (sequelize, Sequelize) => {
	const Img = sequelize.define("image", {
		name: {
			type: Sequelize.STRING,
		},
		size: {
			type: Sequelize.INTEGER,
		},
	})

	return Img
}

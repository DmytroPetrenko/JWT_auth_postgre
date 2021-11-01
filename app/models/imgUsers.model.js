module.exports = (sequelize, Sequelize) => {
	const ImgUsers = sequelize.define("img_users", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		name: {
			type: Sequelize.STRING,
		},
		size: {
			type: Sequelize.INTEGER,
		},
	})

	return ImgUsers
}

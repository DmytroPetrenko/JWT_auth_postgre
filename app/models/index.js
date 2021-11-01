const config = require("../config/db.config.js")

const Sequelize = require("sequelize")
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
	host: config.HOST,
	dialect: config.dialect,
	operatorsAliases: false,

	pool: {
		max: config.pool.max,
		min: config.pool.min,
		acquire: config.pool.acquire,
		idle: config.pool.idle,
	},
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require("../models/user.model.js")(sequelize, Sequelize)
db.role = require("../models/role.model.js")(sequelize, Sequelize)
db.game = require("../models/game.model.js")(sequelize, Sequelize)
db.img = require("../models/img.model.js")(sequelize, Sequelize)
db.imgUsers = require("../models/imgUsers.model.js")(sequelize, Sequelize)

db.role.belongsToMany(db.user, {
	through: "user_roles",
	foreignKey: "roleId",
	otherKey: "userId",
})
db.user.belongsToMany(db.role, {
	through: "user_roles",
	foreignKey: "userId",
	otherKey: "roleId",
})
db.game.belongsToMany(db.user, {
	through: "user_games",
	foreignKey: "gameId",
	otherKey: "userId",
})
db.user.belongsToMany(db.game, {
	through: "user_games",
	foreignKey: "userId",
	otherKey: "gameId",
})
db.img.belongsToMany(db.user, { through: db.imgUsers })
db.user.belongsToMany(db.img, { through: db.imgUsers })
/* db.img.belongsToMany(db.user, {
	through: "img_users",
	foreignKey: "imgId",
	otherKey: "userId",
})
db.user.belongsToMany(db.img, {
	through: "img_users",
	foreignKey: "userId",
	otherKey: "imgId",
}) */

db.ROLES = ["user", "admin", "moderator"]
db.GAMES = ["cs:go", "dota2", "valorant"]

module.exports = db

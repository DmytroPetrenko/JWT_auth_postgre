const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const bcrypt = require("bcryptjs")

const app = express()

var corsOptions = {
	origin: "http://localhost:8081",
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use(fileUpload())

app.use(express.static("images/avatars"))

// database
const db = require("./app/models")
const Role = db.role
const Game = db.game
const Image = db.img
const User = db.user

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
	console.log("Drop and Resync Database with { force: true }")
	initial()
})

//db.sequelize.sync()

// simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to application." })
})

// routes
require("./app/routes/auth.routes")(app)
require("./app/routes/authUser.routes")(app)
require("./app/routes/user.routes")(app)
require("./app/routes/image.routes")(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`)
})

function initial() {
	Role.create({
		id: 1,
		name: "user",
	})

	Role.create({
		id: 2,
		name: "moderator",
	})

	Role.create({
		id: 3,
		name: "admin",
	})

	Game.create({
		id: 1,
		name: "cs:go",
	})

	Game.create({
		id: 2,
		name: "dota2",
	})

	Game.create({
		id: 3,
		name: "valorant",
	})

	Image.create({
		name: "image.png",
		size: 178944,
	})

	User.create({
		username: "admin",
		name: "Dmytro",
		email: "dmitry.a.petrenko@gmail.com",
		password: bcrypt.hashSync("!h@teKNEU228", 8),
	}).then((user) => {
		user.setRoles([1, 2, 3])
		user.setGames([1])
		user.setImages([1])
	})
}

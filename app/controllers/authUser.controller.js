const db = require("../models")

const User = db.user
const ImgUsers = db.imgUsers

exports.edit = async (req, res) => {
	try {
		const user = await User.findOne({ where: { id: req.body.id } })

		user.username = req.body.propsForChange.username
		user.email = req.body.propsForChange.email
		user.name = req.body.propsForChange.name
		user.surname = req.body.propsForChange.surname
		user.university = req.body.propsForChange.university

		await user.save()

		const imgUsers = await ImgUsers.findOne({ where: { userId: req.body.id } })
		imgUsers.imageId = req.body.propsForChange.imgId

		await imgUsers.save()

		const authorities = []
		const roles = await user.getRoles()
		for (let i = 0; i < roles.length; i++) {
			authorities.push("ROLE_" + roles[i].name.toUpperCase())
		}

		const favouriteGames = []
		const games = await user.getGames()
		for (let i = 0; i < games.length; i++) {
			favouriteGames.push("GAME_" + games[i].name.toUpperCase())
		}

		res.status(200).send({
			id: user.id,
			username: user.username,
			email: user.email,
			name: user.name,
			surname: user.surname,
			university: user.university,
			roles: authorities,
			games: favouriteGames,
		})
	} catch (error) {
		res.status(500).send({ message: error.message })
	}
}

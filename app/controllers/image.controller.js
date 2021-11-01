const db = require("../models")

const Image = db.img

exports.upload = async (req, res) => {
	try {
		await Image.create({
			name: req.files.file.name,
			size: req.files.file.size,
		})

		req.files.file.mv(`./images/avatars/${req.files.file.name}`)

		res.status(200).send({ message: "Image succesfully added" })
	} catch (error) {
		res.status(500).send({ message: error.message })
	}
}
exports.getAllImagesNames = async (req, res) => {
	const images = await Image.findAll()
	res.status(200).send(images)
}

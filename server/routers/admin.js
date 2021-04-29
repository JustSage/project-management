/* eslint-disable no-undef */
const express = require('express')
const router = new express.Router()

router.post('/modify-role', async (req, res) => {
	const data = req.body
	try {
		const foundUser = await db
			.collection('users')
			.findOneAndUpdate(
				{ username: data.username },
				{ $set: { role: data.newRole } }
			)

		if (!foundUser) {
			return res
				.status(404)
				.send({ message: 'The username you entered is not found.' })
		}

		res.send({
			message: `New role of ${data.username} is ${data.newRole}.`,
		})
	} catch (e) {
		res.status(500).send({ message: "Can't update!" })
	}
})

module.exports = router

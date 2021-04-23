/* eslint-disable no-undef */
const express = require('express')
const router = new express.Router()

router.get('/pending-reservations', async (req, res) => {
	try {
		let reservations = null
		let i = 0
		reservations = await db
			.collection('pending-reservations')
			.find({})
			.toArray()
		while (reservations == null) {
			i = i + 1
		}
		console.log(reservations)
		res.send(JSON.stringify(reservations))
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Can't show reservations!" })
	}
})

module.exports = router

/* eslint-disable no-undef */
const express = require('express')
const router = new express.Router()
//pending-reservations
router.get('/pending-reservations', async (req, res) => {
	try {
		const reservations = await db
			.collection('pending-reservations')
			.find({})
			.toArray()
		res.send(JSON.stringify(reservations))
	} catch (e) {
		console.log(`error: ${e}`)
		res.status(500).send({ message: "Can't show reservations!" })
	}
})
module.exports = router

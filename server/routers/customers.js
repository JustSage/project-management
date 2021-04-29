/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require('express')
const router = new express.Router()
const validator = require('validator')

router.get('/users', async (req, res) => {
	try {
		//Get the whole data from the collection and send it to client.
		// eslint-disable-next-line no-undef
		const customers = await db
			.collection('users')
			.find({ role: 'Customer' })
			.toArray()
		res.send(JSON.stringify(customers))
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Can't show customers!" })
	}
})

module.exports = router

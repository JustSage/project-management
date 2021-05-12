/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require('express')
const router = new express.Router()
const validator = require('validator')

router.get('/agents-admins', async (req, res) => {
	try {
		//Get the whole data from the collection and send it to client.
		// eslint-disable-next-line no-undef
		const agentsAdmins = await db
			.collection('users')
			.find(
				{ $or: [{ role: 'Travel Agent' }, { role: 'Admin' }] },
				{ email: 1, role: 1, username: 0, password: 0 }
			)
			.toArray()
		res.send(JSON.stringify(agentsAdmins))
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Can't show users!" })
	}
})

module.exports = router

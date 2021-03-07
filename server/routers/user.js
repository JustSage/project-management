/* eslint-disable no-unused-vars */
const express = require('express')
const router = new express.Router()

const userData = {
	username: 'Admin',
	password: 'Admin',
	email: 'admin@gmail.com',
}

router.post('/login', async (req, res) => {
	console.log(req.body)
	const user = { username: req.body.username, password: req.body.password }
	if (
		user.username === userData.username &&
		user.password === userData.password
	) {
		res.send({ message: 'logged in successfully!' })
	} else res.status(404).send()
})

module.exports = router

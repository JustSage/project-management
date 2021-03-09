/* eslint-disable no-unused-vars */
const express = require('express')
const router = new express.Router()
const validator = require('validator')

const userData = {
	username: 'Admin',
	password: 'Admin',
	email: 'admin@gmail.com',
}

router.post('/login', async (req, res) => {
	const user = { username: req.body.username, password: req.body.password }
	if (
		user.password === userData.password &&
		(user.username === userData.username ||
			(user.username === userData.email && validator.isEmail(user.username))) //Validation of email format
	) {
		res.status(200).send({ message: 'logged in successfully!' })
	} else res.status(404).send()
})

module.exports = router

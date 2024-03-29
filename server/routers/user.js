/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require('express')
const router = new express.Router()
const validator = require('validator')
const bcrypt = require('bcrypt')

router.post('/sign-up', async (req, res) => {
	const user = req.body
	if (user.password != user.confirmPass)
		//case that password and password confirmation aren't equal
		return res.status(500).send({ message: "Passwords doesn't match!" })

	//hash password
	user.password = await bcrypt.hash(user.password, 10)

	try {
		if (await db.collection('users').findOne({ username: user.username })) {
			return res
				.status(409)
				.send({ message: 'User already exists in the database!' })
		}

		//Delete password confirmation before saving the user in db
		delete user.confirmPass

		//Insert the user which his details sent in body with post req
		await db.collection('users').insertOne(user)

		res.send({ message: `customer ${user.username} created successfully.` })
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Can't add customer!" })
	}
})

router.post('/login', async (req, res) => {
	const user = { username: req.body.username, password: req.body.password }
	try {
		//find user by typed usernmae/email in the input
		const foundUser = await db.collection('users').findOne({
			$or: [{ username: user.username }, { email: user.username }],
		})

		if (!foundUser) {
			return res.status(404).send({ message: 'User not found.' })
		}

		//encrypt password and compare
		const isMatch = await bcrypt.compare(user.password, foundUser.password)
		if (!isMatch) {
			return res.status(400).send({ message: 'password is not correct.' })
		}

		//Send user role and email for later use.
		res.send({
			message: 'logged in.',
			role: foundUser.role,
			email: foundUser.email,
		})
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Can't login!" })
	}
})

module.exports = router

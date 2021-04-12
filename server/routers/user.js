/* eslint-disable no-unused-vars */
const express = require('express')
const router = new express.Router()
const validator = require('validator')
const db = require('../database/mongoclient')
const { MongoClient } = require('mongodb')

//Meanwhile it will be here but later we need to move this to env file and ignore the file
const url =
	'mongodb+srv://sage:vL2PPAcKN5cokJJe@database.rufn2.mongodb.net/database?retryWrites=true&w=majority'

const dbName = 'database'

const userData = {
	username: 'Admin',
	password: 'Admin123',
	email: 'admin@gmail.com',
}

router.post('/sign-up', async (req, res) => {
	const user = req.body
	if (user.password != user.confirmPass)
		return res.status(500).send({ message: "Passwords doesn't match!" })

	MongoClient.connect(url, { useNewUrlParser: true }, async (error, client) => {
		if (error) {
			return console.log('Unable to connect')
		}
		console.log('MongoDB is connected!')

		var db = client.db(dbName)

		try {
			await db.collection('customers').insertOne(user)
			res.send({ message: `customer ${user.username} created successfully.` })
		} catch (e) {
			console.log(e)
			res.status(500).send({ message: "Can't add customer!" })
		}
	})
})

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

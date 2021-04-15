/* eslint-disable no-unused-vars */
const express = require('express')
const router = new express.Router()
const validator = require('validator')
// const db = require('../database/mongoclient')
const { MongoClient } = require('mongodb')
const bcrypt = require('bcrypt')

router.post('/sign-up', async (req, res) => {
	const user = req.body
	if (user.password != user.confirmPass)
		//case that password and password confirmation aren't equal
		return res.status(500).send({ message: "Passwords doesn't match!" })

	//hash password
	user.password = await bcrypt.hash(user.password, 10)

	//Connect to mongodb to save new user in db
	MongoClient.connect(
		process.env.MONGODB_URL,
		{ useNewUrlParser: true, useUnifiedTopology: true },
		async (error, client) => {
			if (error) {
				//return to print and break function
				return console.log('Unable to connect')
			}
			console.log('MongoDB is connected!')

			var db = client.db(process.env.DATABASE_NAME)

			try {
				//TODO: Check if username/email already exist in db.
				//
				//
				//

				//Delete password confirmation before saving the user in db
				delete user.confirmPass

				//Insert the user which his details sent in body with post req
				await db.collection('users').insertOne(user)

				res.send({ message: `customer ${user.username} created successfully.` })
			} catch (e) {
				console.log(e)
				res.status(500).send({ message: "Can't add customer!" })
			}
		}
	)
})

router.post('/login', async (req, res) => {
	const user = { username: req.body.username, password: req.body.password }
	MongoClient.connect(
		process.env.MONGODB_URL,
		{ useNewUrlParser: true, useUnifiedTopology: true },
		async (error, client) => {
			if (error) {
				//return to print and break function
				return console.log('Unable to connect')
			}
			console.log('MongoDB is connected!')

			var db = client.db(process.env.DATABASE_NAME)

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

				//Send user role for later use.
				res.send({ message: 'logged in.', role: foundUser.role })
			} catch (e) {
				console.log(e)
				res.status(500).send({ message: "Can't login!" })
			}
		}
	)
})

module.exports = router

/* eslint-disable no-unused-vars */
const express = require('express')
const router = new express.Router()
const validator = require('validator')
// const db = require('../database/mongoclient')
const { MongoClient } = require('mongodb')

router.get('/customers'), async (req, res) => {
	//Connect to mongodb
	MongoClient.connect(
		process.env.MONGODB_URL,
		async (error, client) => {
			if (error) {
				//return to print and break function
				return console.log('Unable to connect')
			}
			console.log('MongoDB is connected!')
			var db = client.db(process.env.DATABASE_NAME)
			try {
				return res.send(db.collection('users').find({role : "Customer"}).toArray())
			} catch (e) {
				console.log(e)
				res.status(500).send({ message: "Can't read customer data!" })
			}
		}
	)
}

module.exports = router


const express = require('express')
const router = new express.Router()
const { MongoClient } = require('mongodb')

router.get('/customers', async (req, res) => {
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
				//Get the whole data from the collection and send it to client.
				const customers = await db.collection('users').find({role : "Customer"}).toArray()
				res.send(JSON.stringify(customers))
			} catch (e) {
				console.log(e)
				res.status(500).send({ message: "Can't show customers!" })
			}
		}
	)
})

module.exports = router


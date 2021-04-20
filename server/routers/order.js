const express = require('express')
const router = new express.Router()
const { MongoClient } = require('mongodb')

router.post('/orders', async (req, res) => {
	const data = req.body

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
				const orders = await db.collection('orders').find({})
				res.send(orders)
			} catch (e) {
				console.log(e)
				res.status(500).send({ message: "Can't update!" })
			}
		}
	)
})

module.exports = router

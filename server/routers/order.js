const express = require('express')
const router = new express.Router()
const { MongoClient } = require('mongodb')

router.get('/orders', async (req, res) => {
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
				const orders = await db.collection('orders').find({}).toArray()
				res.send(JSON.stringify(orders))
			} catch (e) {
				console.log(e)
				res.status(500).send({ message: "Can't show orders!" })
			}
		}
	)
})

// adding an order to the database
router.post('/add-order', async (req, res) => {
	const order = req.body

	//Connect to mongodb
	MongoClient.connect(
		process.env.MONGODB_URL,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			connectTimeoutMS: 50000,
			serverSelectionTimeoutMS: 50000,
		},
		async (error, client) => {
			if (error) {
				//return to print and break function
				return console.log('Unable to connect')
			}
			console.log('MongoDB is connected!')

			var db = client.db(process.env.DATABASE_NAME)

			try {
				//Insert the order to the DB
				await db.collection('orders').insertOne(order)

				res.send({
					message: `Your order is saved successfully, bill will sent to your inbox.`,
				})
			} catch (e) {
				console.log(e)
				res.status(500).send({ message: "Can't make an order!" })
			}
		}
	)
})

module.exports = router

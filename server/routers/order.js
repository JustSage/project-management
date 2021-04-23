/* eslint-disable no-undef */
const express = require('express')
const router = new express.Router()

router.get('/orders', async (req, res) => {
	try {
		//Get the whole data from the collection and send it to client.
		const orders = await db.collection('orders').find({}).toArray()
		res.send(JSON.stringify(orders))
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Can't show orders!" })
	}
})

// adding an order to the database
router.post('/add-order', async (req, res) => {
	const order = req.body

	try {
		//Insert the order to the DB
		console.log(order)
		await db.collection('orders').insertOne(order)

		res.send({
			message: `Your order is saved successfully, bill will sent to your inbox.`,
		})
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Can't make an order!" })
	}
})

module.exports = router

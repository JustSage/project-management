/* eslint-disable no-undef */
const express = require('express')
const router = new express.Router()

router.get('/messages', async (req, res) => {
	try {
		//Get the whole data from the collection and send it to client.
		const orders = await db.collection('messages').find({}).toArray()
		res.send(JSON.stringify(orders))
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Can't show messages!" })
	}
})
// router.get('/customer-orders', async (req, res) => {
// 	try {
// 		let user = req.query.User
// 		console.log(`user: ${user}`)
// 		const orders = await db.collection('orders').find({ User: user }).toArray()
// 		res.send(JSON.stringify(orders))
// 	} catch (e) {
// 		console.log(e)
// 		res.status(500).send({ message: "Can't show orders!" })
// 	}
// })

// adding a message to the database
router.post('/contact-us', async (req, res) => {
	const message = req.body

	try {
		//Insert the message to the DB
		console.log(message)
		await db.collection('messages').insertOne(message)

		res.send({
			successMessage: `Your message was sent successfully`,
		})
	} catch (e) {
		console.log(e)
		res
			.status(500)
			.send({ errorMessage: "Can't send the message, please try later!" })
	}
})

// router.post('/update-order-status', async (req, res) => {
// 	const order = req.body

// 	try {
// 		console.log(order)
// 		await db
// 			.collection('orders')
// 			.updateOne({ User: order.User }, { $set: { Status: order.Status } })

// 		res.send({
// 			message: `Your order Updated successfully.`,
// 		})
// 	} catch (e) {
// 		console.log(e)
// 		res.status(500).send({ message: "Can't make an order!" })
// 	}
// })

// router.post('/update-order-status-canceled', async (req, res) => {
// 	const order = req.body

// 	try {
// 		console.log(order)
// 		await db
// 			.collection('orders')
// 			.updateOne(
// 				{ User: order.User, Destination: order.Destination },
// 				{ $set: { Status: order.Status } }
// 			)

// 		res.send({
// 			message: `Your order Updated successfully.`,
// 		})
// 	} catch (e) {
// 		console.log(e)
// 		res.status(500).send({ message: "Can't make an order!" })
// 	}
// })

// router.post('/delete-order-by-destination', async (req, res) => {
// 	const order = req.body

// 	try {
// 		console.log(order)
// 		await db
// 			.collection('orders')
// 			.deleteOne({ Destination: order.Destination, User: order.User })

// 		res.send({
// 			message: `Your order Updated successfully.`,
// 		})
// 	} catch (e) {
// 		console.log(e)
// 		res.status(500).send({ message: "Can't make an order!" })
// 	}
// })

// router.post('/update-all-ordes-statuses', async (req, res) => {
// 	const order = req.body

// 	try {
// 		console.log(order)
// 		await db
// 			.collection('orders')
// 			.updateMany({ Status: 'Pending' }, { $set: { Status: order.Status } })

// 		res.send({
// 			message: `All orders Updated successfully.`,
// 		})
// 	} catch (e) {
// 		console.log(e)
// 		res.status(500).send({ message: "Can't make an order!" })
// 	}
// })

module.exports = router

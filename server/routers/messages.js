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

router.get('/read-massages', async (req, res) => {
	try {
		//Get the whole data from the collection and send it to client.
		const orders = await db
			.collection('messages')
			.find({
				Read: false,
			})
			.toArray()
		res.send(JSON.stringify(orders))
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Can't show messages!" })
	}
})

router.post('/set-read', async (req, res) => {
	const message = req.body

	try {
		console.log(message)
		await db
			.collection('messages')
			.updateOne(
				{ Subject: message.Subject, Message: message.Message },
				{ $set: { Read: true } }
			)

		res.send({
			message: `Your message Updated successfully.`,
		})
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: 'Message was not updated' })
	}
})

router.get('/delete-message/:id', async (req, res) => {
	try {
		var ObjectID = require('mongodb').ObjectID
		const mailID = req.params.id
		// eslint-disable-next-line prettier/prettier
		await db.collection('messages').deleteOne({"_id": ObjectID(mailID)})
		res.send({ message: `Message deleted successfully!` })
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Can't delete mail!" })
	}
})

module.exports = router

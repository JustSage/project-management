const express = require('express')
const router = new express.Router()
const { MongoClient } = require('mongodb')

const url =
	'mongodb+srv://sage:vL2PPAcKN5cokJJe@database.rufn2.mongodb.net/database?retryWrites=true&w=majority'

const dbName = 'database'

router.post('/modify-role', async (req, res) => {
	const data = req.body
    console.log(data)
	MongoClient.connect(
		url,
		{ useNewUrlParser: true, useUnifiedTopology: true },
		async (error, client) => {
			if (error) {
				//return to print and break function
				return console.log('Unable to connect')
			}
			console.log('MongoDB is connected!')

			var db = client.db(dbName)

			try {
				const foundUser = await db
					.collection('users')
					.findOneAndUpdate(
						{ username: data.username },
						{ $set: { role: data.newRole } }
					)

				if (!foundUser) {
					return res
						.status(404)
						.send({ message: 'The username you entered is not found.' })
				}

				res.send({
					message: `New role of ${data.username} is ${data.newRole}.`,
				})
			} catch (e) {
				console.log(e)
				res.status(500).send({ message: "Can't update!" })
			}
		}
	)
})

module.exports = router

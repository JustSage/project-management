const express = require('express')
const router = new express.Router()
const { MongoClient } = require('mongodb')

router.post('/modify-role', async (req, res) => {
	const data = req.body

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

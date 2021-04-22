const express = require('express')
const router = new express.Router()
const validator = require('validator')
const { MongoClient } = require('mongodb')

// adding a package to the database
router.post('/add-package', async (req, res) => {
	const package = req.body

	//Connect to mongodb
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
				//Check if url is valid
				if (!validator.isURL(package.url, { protocols: ['http', 'https'] })) {
					return res.status(500).send({ message: 'URL is not valid!' })
				}

				//Insert the package to the DB
				await db.collection('packages').insertOne(package)

				res.send({ message: `Package ${package.id} created successfully.` })
			} catch (e) {
				console.log(e)
				res.status(500).send({ message: "Can't add a package!" })
			}
		}
	)
})


router.delete('/packages/:id', async (req, res) => {
	// :id removes accepts any path after /.
	const package = req.body
	//Connect to mongodb
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
				await db.collection('pacakage').deleteOne( { name : package.name })
				res.send({ message: `Package ${package.name} deleted successfully.` })
			} catch (e) {
				console.log(e)
				res.status(500).send({ message: "Can't delete a package!" })
			}
		}
	)
})

router.get('/packages', async (req, res) => {
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
				const package = await db.collection('packages').findOne({id:req.id})
				res.send(JSON.stringify(package))
			} catch (e) {
				console.log(e)
				res.status(500).send({ message: `Can't find package!` })
			}
		}
	)
})


module.exports = router

/* eslint-disable no-undef */
const express = require('express')
const router = new express.Router()
const validator = require('validator')

// adding a package to the database
router.post('/add-package', async (req, res) => {
	const pkg = req.body

	try {
		//Check if url is valid
		if (!validator.isURL(pkg.url, { protocols: ['http', 'https'] })) {
			return res.status(500).send({ message: 'URL is not valid!' })
		}

		//Insert the package to the DB
		await db.collection('packages').insertOne(pkg)

		res.send({ message: `Package ${pkg.name} created successfully.` })
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Can't add a package!" })
	}
})
router.post('/update-package', async (req, res) => {
	const pkg = req.body

	try {
		//Check if url is valid
		if (!validator.isURL(pkg.url, { protocols: ['http', 'https'] })) {
			return res.status(500).send({ message: 'URL is not valid!' })
		}

		//Insert the package to the DB
		await db.collection('packages').updateOne(
			{ description: pkg.description },
			{
				$set: {
					name: pkg.name,
					description: pkg.description,
					quantity: pkg.quantity,
					price: pkg.price,
					url: pkg.url,
					updated: pkg.updated,
				},
			}
		)

		res.send({ message: `Package ${pkg.name} Updated successfully!.` })
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Can't add a package!" })
	}
})

router.delete('/packages/:id', async (req, res) => {
	// :id removes accepts any path after /.
	const pkg = req.body

	try {
		await db.collection('pacakage').deleteOne({ name: pkg.name })
		res.send({ message: `Package ${pkg.name} deleted successfully.` })
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Can't delete a package!" })
	}
})

router.get('/packages', async (req, res) => {
	try {
		const packages = await db.collection('packages').find({}).toArray()
		res.send(JSON.stringify(packages))
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Can't show packages!" })
	}
})

module.exports = router

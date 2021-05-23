/* eslint-disable no-undef */
const express = require('express')
const router = new express.Router()
const validator = require('validator')

// adding a package to the database
router.post('/add-package', async (req, res) => {
	let pkg = req.body

	try {
		//Check if url is valid
		if (!validator.isURL(pkg.url, { protocols: ['http', 'https'] })) {
			return res.status(500).send({ message: 'URL is not valid!' })
		}

		pkg.rating = 0.0

		//Insert the package to the DB
		await db.collection('packages').insertOne(pkg)

		res.send({ message: `Package ${pkg.name} created successfully.` })
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Can't add a package!" })
	}
})

router.put('/update-package', async (req, res) => {
	const pkg = req.body
	console.log(`url is: ${pkg.url}`)
	try {
		//Check if url is valid
		if (pkg.url != '') {
			if (!(await validator.isURL(pkg.url, { protocols: ['http', 'https'] }))) {
				return res.status(500).send({ message: 'URL is not valid!' })
			}
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

router.post('/decrement-quantity', async (req, res) => {
	const pkg = req.body
	const q = pkg.quantity
	try {
		await db.collection('packages').updateOne(
			{ description: pkg.description },
			{
				$set: {
					quantity: q,
				},
			}
		)
		res.send({ message: `Thank you!` })
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Can't add a package!" })
	}
})
router.post('/update-rating', async (req, res) => {
	const pkg = req.body
	const rating = pkg.rating
	const name = pkg.name
	try {
		await db.collection('packages').updateOne(
			{ name: name },
			{
				$set: {
					rating: rating,
				},
			}
		)

		res.send({ message: `Thank you for rating this package!` })
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Can't add a package!" })
	}
})

router.post('/increment-quantity', async (req, res) => {
	const pkg = req.body
	const q = pkg.quantity + 1
	try {
		await db.collection('packages').updateOne(
			{ name: pkg.destination },
			{
				$set: {
					quantity: q,
				},
			}
		)

		res.send({ message: `Thank you!` })
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Can't add a package!" })
	}
})

router.delete('/packages/:id', async (req, res) => {
	// :id removes accepts any path after /.
	const pkg = req.body

	try {
		await db.collection('package').deleteOne({ name: pkg.name })
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

router.get('/one-package', async (req, res) => {
	try {
		let description = req.query.Description
		const packages = await db
			.collection('packages')
			.find({ description: description })
			.toArray()
		res.send(JSON.stringify(packages))
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Can't show packages!" })
	}
})

router.get('/one-package-destination', async (req, res) => {
	try {
		let name = req.query.name
		const packages = await db
			.collection('packages')
			.find({ name: name })
			.toArray()
		res.send(JSON.stringify(packages))
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Can't show packages!" })
	}
})

router.get('/delete-package/:name', async (req, res) => {
	try {
		const packageName = req.params.name
		await db.collection('packages').deleteOne({ name: packageName })
		res.send({ message: `package ${packageName} deleted successfully!` })
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Can't delete package!" })
	}
})

router.get('/package-by-rating', async (req, res) => {
	try {
		const packages = await db
			.collection('packages')
			.find({ rating: { $gt: '3' } })
			.toArray()
		res.send(JSON.stringify(packages))
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Can't show packages!" })
	}
})

module.exports = router

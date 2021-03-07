const express = require('express')
const router = new express.Router()

router.get('/login/:username', async (req, res) => {
	const users = ['David', 'Sagie', 'Yonatan', 'Ariel']
	console.log(req.params.username)
	if (users.includes(req.params.username)) {
		res.send({ message: 'logged in successfully!' })
	} else res.status(404).send()
})

module.exports = router

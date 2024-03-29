const sgMail = require('@sendgrid/mail')
const express = require('express')
const router = new express.Router()
const api_key =
	'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'
sgMail.setApiKey(api_key)

router.post('/send-email', async (req, res) => {
	const email = req.body

	try {
		const msg = {
			to: email.email,
			from: 'davech1228@gmail.com',
			subject: 'Register to PineApple Travels',
			text: 'Thank you for registering to PineApple Travels!',
		}

		sgMail.send(msg, (err) => {
			if (err) {
				console.log('email did not sent')
			} else {
				console.log(`email sent successfully to ${email.email}`)
			}
		})
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Can't! send an email" })
	}
})
router.post('/send-email', async (req, res) => {
	const email = req.body

	try {
		const msg = {
			to: email.email,
			from: 'davech1228@gmail.com',
			subject: 'Register to PineApple Travels',
			text: 'Thank you for registering to PineApple Travels!',
		}

		sgMail.send(msg, (err) => {
			if (err) {
				console.log('email did not sent')
			} else {
				console.log(`email sent successfully to ${email.email}`)
			}
		})
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Can't! send an email" })
	}
})
router.post('/send-email-to', async (req, res) => {
	const sendTo = req.body
	const email = sendTo.email
	const subject = sendTo.subject
	const text = sendTo.text

	try {
		const msg = {
			to: email,
			from: 'davech1228@gmail.com',
			subject: subject,
			text: text,
		}

		sgMail.send(msg)
		res.send(JSON.stringify('Did it!'))
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Can't! send an email" })
	}
})
router.post('/send-broadcast-email', async (req, res) => {
	const email = req.body
	const emails = email.emails
	const text = email.text

	let msg

	try {
		msg = {
			to: emails,
			from: 'davech1228@gmail.com',
			subject: 'Broadcast Message!',
			text: text,
		}

		sgMail.sendMultiple(msg, (err) => {
			if (err) {
				console.log(`email did not sent ${err}`)
				res.send()
			} else {
				console.log(`email sent successfully to ${emails}`)
			}
		})
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Can't! send an email" })
	}
})

module.exports = router

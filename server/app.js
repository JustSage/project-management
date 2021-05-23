const app = require('./app-source')
const path = require('path')
const express = require('express')

const port = process.env.PORT || 3001

app.use(express.static(path.join(__dirname, 'build')))

app.use((req, res, next) => {
	res.setHeader('Acces-Control-Allow-Origin', '*')
	res.setHeader('Acces-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
	res.setHeader('Acces-Contorl-Allow-Methods', 'Content-Type', 'Authorization')
	next()
})
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(port, () => {
	console.log(`App is listen to port ${port}`)
})

module.exports = app

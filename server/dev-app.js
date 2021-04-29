const app = require('./app-source')
const express = require('express')
const path = require('path')
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

const port = process.env.PORT || 3001

app.get('/', (req, res) => {
	res.sendFile('index.html')
})

app.listen(port, () => {
	console.log(`App is listen to port ${port}`)
})

module.exports = app

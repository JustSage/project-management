const path = require('path')
const express = require('express')
require('./database/mongoclient')
const userRouter = require('./routers/user')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

const port = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(userRouter)
app.use(cors())
app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(port, () => {
	console.log(`App is listen to port ${port}`)
})

module.exports = app

const path = require('path')
const express = require('express')
const userRouter = require('./routers/user')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const publicDirectoryPath = path.join(__dirname, './build')

const port = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(express.static(publicDirectoryPath))
app.use(userRouter)
app.use(cors())

app.get('/', (req, res) => {
	res.sendFile('index.html')
})

app.listen(port, () => {
	console.log(`App is listen to port ${port}`)
})

module.exports = app

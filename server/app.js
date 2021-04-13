const path = require('path')
const express = require('express')
const userRouter = require('./routers/user')
const adminRouter = require('./routers/admin')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

const port = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(userRouter)
app.use(adminRouter)
app.use(cors())
app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(port, () => {
	console.log(`App is listen to port ${port}`)
})

module.exports = app

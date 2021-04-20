const express = require('express')
const userRouter = require('./routers/user')
const adminRouter = require('./routers/admin')
const pacakgeRouter = require('./routers/package')
const customersRouter = require('./routers/customers')
const orderRouter = require('./routers/order')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(userRouter)
app.use(adminRouter)
app.use(pacakgeRouter)
app.use(customersRouter)
app.use(orderRouter)
app.use(cors())

module.exports = app

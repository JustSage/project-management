/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../server/app-source')
const { MongoClient } = require('mongodb')

beforeAll(async () => {
	const url = process.env.MONGODB_URL
	connection = await MongoClient.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	db = await connection.db(process.env.DATABASE_NAME)
})

test('Make an order', async () => {
	await request(app)
		.post('/add-order')
		.send({
			OrderName: 'testOrder',
			User: 'test',
			Destination: 'Israel',
			Quantity: 3,
			Price: '1000$',
			Deal: 'Package',
			Status: 'In Proc',
			OrderDate: new Date(),
			VacationDate: new Date(),
		})
		.expect(200)
})

test('Delete the order', async () => {
	await request(app)
		.post('/delete-order-by-destination')
		.send({
			Destination: 'Israel',
			User: 'test',
		})
		.expect(200)
})

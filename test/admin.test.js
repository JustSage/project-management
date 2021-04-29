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

test('Change user role', async () => {
	await request(app)
		.post('/modify-role')
		.send({
			newRole: 'Admin',
			username: 'test',
		})
		.expect(200)
})

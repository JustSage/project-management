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

test('Signup as a current user, so it will return 409 status code', async () => {
	await request(app)
		.post('/sign-up')
		.send({
			username: 'test user',
			password: 'test password',
			confirmPass: 'test password',
			email: 'test@test.com',
			role: 'Customer',
		})
		.expect(409)
})

test('Access the homepage as a user (test user which created above)', async () => {
	await request(app)
		.post('/login')
		.send({
			username: 'test user',
			password: 'test password',
		})
		.expect(200)
})

test('Access the homepage as non-user', async () => {
	await request(app)
		.post('/login')
		.send({
			username: 'non-test user',
			password: 'non-test password',
		})
		.expect(404)
})

/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../server/app-source')
// const { MongoClient } = require('mongodb')

test('Signup as a new user with appropriate details.', async () => {
	await request(app)
		.post('/sign-up')
		.send({
			username: 'test user',
			password: 'test password',
			confirmPass: 'test password',
			email: 'test@test.com',
			role: 'Customer',
		})
		.expect(200)
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

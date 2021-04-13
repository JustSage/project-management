/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../server/app-source')

test('Should signup a new user', async () => {
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

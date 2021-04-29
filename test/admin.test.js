/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../server/app')

test('Change user role', async () => {
	await request(app)
		.post('/modify-role')
		.send({
			newRole: 'Admin',
			username: 'test',
		})
		.expect(200)
})

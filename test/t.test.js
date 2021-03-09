/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../server/app')

// test('Hello world!!', () => {})

const userOne = {
	name: 'Admin',
	email: 'admin@gmail.com',
	password: 'Admin',
}

test('Check user', async (done) => {
	await request(app)
		.post('/login')
		.send({
			username: userOne.name,
			password: userOne.password,
		})
		.expect(200)
	done()
})

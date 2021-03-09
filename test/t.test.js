const request = require('supertest')
const app = require('../server/app')

/* eslint-disable no-undef */
test('Hello world!!', () => {})

const userOne = {
	name: 'Admin',
	email: 'admin@gmail.com',
	password: 'Admin',
}

function sum(a, b) {
	return a + b
}

test('adds 1 + 2 to equal 3', () => {
	expect(sum(1, 2)).toBe(3)
})

test('Check user', async () => {
	await request(app)
		.post('/login')
		.send({
			username: userOne.name,
			password: userOne.password,
		})
		.expect(200)
})

/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../server/app')
const validator = require('validator')

// test('Hello world!!', () => {})

const userOne = {
	name: 'Admin',
	email: 'admin@gmail.com',
	password: 'Admin123',
}

test('Check user', async () => {
	await request(app)
		.post('/login')
		.send({
			username: userOne.name,
			password: userOne.password,
		})
		.expect(200)
})

//TODO
test('Validate email', () => {})

//TODO - isAlphaNumeric
test('Check if password include letters', () => {})

test('Check if username include letters and numbers', () => {
	expect(validator.isAlpha(userOne.name)).toBe(true)
})

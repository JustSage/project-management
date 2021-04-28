/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const validator = require('validator')

// const userOne = {
// 	name: 'Admin',
// 	email: 'admin@gmail.com',
// 	password: 'Admin123',
// }

// // Checks if post request passes
// test('Check user', async () => {
// 	await request(app)
// 		.post('/login')
// 		.send({
// 			username: userOne.name,
// 			password: userOne.password,
// 		})
// 		.expect(200)
// })

test('Validate email', () => {
	expect(validator.isEmail('abcd@gmail.com')).toBe(true)
})

test('Check if username include letters', () => {
	expect(validator.isAlpha('Admin')).toBe(true)
})

test('Check if password include letters and numbers', () => {
	expect(validator.isAlphanumeric('12345abc')).toBe(true)
})

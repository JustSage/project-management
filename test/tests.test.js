/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const validator = require('validator')

test('Validate email', () => {
	expect(validator.isEmail('abcd@gmail.com')).toBe(true)
})

test('Check if username include letters', () => {
	expect(validator.isAlpha('Admin')).toBe(true)
})

test('Check if password include letters and numbers', () => {
	expect(validator.isAlphanumeric('12345abc')).toBe(true)
})

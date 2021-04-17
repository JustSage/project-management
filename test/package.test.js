/* eslint-disable no-undef */
const validator = require('validator')

test('image url should start with http/s and include jpg,png,jpeg etc.', () => {
	const url =
		'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'

	expect(validator.isURL(url, { protocols: ['http', 'https'] })).toBe(true)
	expect(
		url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg')
	).toBe(true)
})

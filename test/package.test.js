/* eslint-disable no-undef */
const validator = require('validator')
const app = require('../server/app-source')
const request = require('supertest')
const { MongoClient } = require('mongodb')

beforeAll(async () => {
	const url = process.env.MONGODB_URL
	connection = await MongoClient.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	db = await connection.db(process.env.DATABASE_NAME)
})

test('image url should start with http/s and include jpg,png,jpeg etc.', () => {
	const url =
		'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'

	expect(validator.isURL(url, { protocols: ['http', 'https'] })).toBe(true)
	expect(
		url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg')
	).toBe(true)
})

test('Should add new package', async () => {
	await request(app)
		.post('/add-package')
		.send({
			name: 'TEST',
			description: 'TEST',
			quantity: 2,
			price: '300$',
			url:
				'https://www.openspacevashon.com/wp-content/uploads/2020/08/test.jpg',
			updated: 'No',
		})
		.expect(200)
})

test('Should delete the package that has been created', async () => {
	await request(app).get(`/delete-package/TEST`).expect(200)
})

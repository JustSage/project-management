/* eslint-disable no-undef */
const { MongoClient } = require('mongodb')
MongoClient.connect(
	process.env.MONGODB_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	async (error, client) => {
		if (error) {
			console.log('Unable to connect')
			throw error
		}
		console.log('MongoDB is connected!')

		//Global variable defined and will be reached by all scripts (routers) of App.js in server
		global.db = client.db(process.env.DATABASE_NAME)
	}
)

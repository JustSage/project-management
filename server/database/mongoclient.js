/* eslint-disable no-undef */
const { MongoClient } = require('mongodb')
//Connect to mongodb to save new user in db
MongoClient.connect(
	process.env.MONGODB_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	async (error, client) => {
		if (error) {
			//return to print and break function
			console.log('Unable to connect')
			throw error
		}
		console.log('MongoDB is connected!')

		global.db = client.db(process.env.DATABASE_NAME)
	}
)

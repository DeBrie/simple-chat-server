const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'quick-chat';

module.exports = (callback) => {
	MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
		const db = client.db(dbName);
		callback(db)
	});
}
const { MongoClient } = require('mongodb');

const uri = 'YOUR_MONGODB_ATLAS_CONNECTION_URI';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = client;

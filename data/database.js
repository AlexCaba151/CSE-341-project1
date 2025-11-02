const { MongoClient } = require('mongodb');
require('dotenv').config();

let database;

const initDb = async (callback) => {
  if (database) {
    console.log('Database already initialized');
    return callback(null, database);
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    database = client;
    console.log('Connected to MongoDB');
    callback(null, database);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    callback(err);
  }
};

const getDatabase = () => {
  if (!database) {
    throw new Error('Database not initialized');
  }
  return database;
};

module.exports = {
  initDb,
  getDatabase,
};

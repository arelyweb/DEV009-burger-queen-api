/* eslint-disable linebreak-style */
const { MongoClient } = require('mongodb');
// eslint-disable-next-line import/newline-after-import
const config = require('./config');
const client = new MongoClient(config.dbUrl);
async function connect() {
  try {
    await client.connect();
    const db = client.db('db-queen');
    return db;
  } finally {
    await client.close();
  }
}

module.exports = { connect };

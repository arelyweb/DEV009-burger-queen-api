/* eslint-disable linebreak-style */
const { connect } = require('http2');
const config = require('./config');
// (async function() {
//   const client = new MongoClient(config.dbUrl);
//   try {
//     await client.connect();
//     const db = client.db('bq-db');
//     console.log('conectado a mongodb')
    
//     return db;
//   } catch (err) {
//     console.log(err.stack);
//   }
//   client.close();
// })();


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

(async function connect() {
  // Database Name
  const dbName = 'bq-db';
  const client = new MongoClient(config.dbUrl);

  try {
    // Use connect method to connect to the Server
    await client.connect();
    console.log('conectado a mongodb')
    const db = client.db(dbName);

  } catch (err) {
    console.log(err.stack);
  }

  client.close();
})();

module.exports= connect;

/* eslint-disable linebreak-style */
const { MongoClient } = require('mongodb');
// eslint-disable-next-line import/newline-after-import
const config = require('./config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = config.dbUrl;

module.exports = db;



module.exports = { connect };

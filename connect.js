/* eslint-disable linebreak-style */
//const { connect } = require('http2');
const config = require('./config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = config.dbUrl;

module.exports = db;




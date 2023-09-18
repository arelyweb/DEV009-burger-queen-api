// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
  name: String,
  email: String,
});

module.exports = {
  SomeModelSchema
}


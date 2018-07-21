const mongoose = require ('mongoose');

// create an instance of the schema
const Schema = mongoose.Schema;

// create a new Schema for the user data in MongoDB
const userSchema = new Schema({
   email: String,
   password: String
});

// export the mongoose model that will be used to create, read, update, delete documents/data in the database.
module.exports = mongoose.model('user', userSchema, 'users');
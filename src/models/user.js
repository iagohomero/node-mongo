var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../config/db');

var UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
},
{ collection: 'users' }
);

module.exports = db.Mongoose.model('User', UserSchema);
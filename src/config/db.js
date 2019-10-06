var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/node-mongo', { useNewUrlParser: true, useUnifiedTopology: true });
 
module.exports = { Mongoose: mongoose }
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const uri = require('./config/keys').mongo.uri;
const Schema = mongoose.Schema;
mongoose.connect(uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Successful connection to MongoLab db');
});

module.exports = mongoose;

require('dotenv').config({ path: __dirname + '/../variables.env' });

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Successful connection to MongoLab db');
});

module.exports = mongoose;

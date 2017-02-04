const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const uri = require('./config/keys').mongo.uri;
const Schema = mongoose.Schema;
mongoose.connect(uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

let models = {};

db.once('open', function() {
  console.log('Successful connection to MongoLab db');

  const tweetSchema = mongoose.Schema({
    id: Number,
    text: String,
    timestamp_ms: String
  });

  models.Tweet = mongoose.model('Tweet', tweetSchema);
});

function saveToMongo(data) {
  new models.Tweet(data).save();
}

module.exports = {
  saveToMongo
};

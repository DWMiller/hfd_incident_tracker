const mongoose = require('../mongoose-connection');
const Schema = mongoose.Schema;

const tweetSchema = Schema({
  id: Number,
  text: String,
  timestamp_ms: String
});

module.exports = mongoose.model('Tweet', tweetSchema);

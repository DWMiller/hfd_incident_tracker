const mongoose = require('../mongoose-connection');

const tweetSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  text: String,
  timestamp_ms: String,
});

module.exports = mongoose.model('Tweet', tweetSchema);

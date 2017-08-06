const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const tweetSchema = mongoose.Schema({
  id: {
    type: String,
  },
  text: String,
  time: String,
});

module.exports = mongoose.model('Tweet', tweetSchema);

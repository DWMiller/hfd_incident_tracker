const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const tweetSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  text: String,
  time: String,
});

module.exports = mongoose.model('Tweet', tweetSchema);

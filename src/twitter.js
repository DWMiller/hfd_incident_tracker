const Twitter = require('node-tweet-stream');
const tweetParser = require('./tweet-parser.js');
const tweetRefiner = require('./tweet-refiner.js');
const tweetGeoCoder = require('./tweet-geocoder.js');

function connect() {
  return new Twitter(require('./config/keys').twitter);
}

function refineTweet(tweet) {
  return tweetRefiner(tweet);
}

function parseTweet(tweet) {
  return tweetParser(tweet);
}

function geoCodeTweet(tweet) {
  return tweetGeoCoder(tweet);
}

module.exports = {
  connect,
  parseTweet,
  refineTweet,
  geoCodeTweet
};

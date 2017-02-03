const Twitter = require('node-tweet-stream');
const tweetParser = require('./tweet-parser.js');
const tweetRefiner = require('./tweet-refiner.js');
const tweetGeoCoder = require('./tweet-geocoder.js');
const tweetFetcher = require('./tweet-fetcher.js');

function connect() {
  return new Twitter(require('./config/keys').twitter);
}

function refineTweet(tweet) {
  return tweetRefiner(tweet);
}

function fetchFullTweet(tweet) {
  return tweetFetcher.fetchFullTweet(tweet);
}

function handleTweet(tweet, callback) {
  const parsedTweet = tweetParser(tweet);

  if (parsedTweet.type !== 'NEW') {
    console.log(`UPDATE ONLY: ${parsedTweet.code}`);
    // not set up to handle event updates yet
    return;
  }

  if (!parsedTweet.intersection) {
    console.log(`UNHANDLED TWEET:`);
    // not set up to handle event updates yet
    return;
  }

  console.log(`PARSED: ${parsedTweet.intersection}`);

  tweetGeoCoder(parsedTweet).then(callback).catch(error => console.log(error));
}

module.exports = {
  handleTweet,
  connect,
  refineTweet,
  fetchFullTweet
};

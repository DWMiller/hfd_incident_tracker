require('dotenv').config({ path: __dirname + '/../variables.env' });

const Twitter = require('node-tweet-stream');
const tweetParser = require('./tweet-parser.js');
const tweetRefiner = require('./tweet-refiner.js');
const tweetGeoCoder = require('./tweet-geocoder.js');
const tweetFetcher = require('./tweet-fetcher.js');

const Tweet = require('./models/Tweet.js');
const Incident = require('./models/Incident.js');

function processTweet(tweet, callback) {
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

module.exports = function(socket) {
  
  const connection = new Twitter({
    consumer_key:process.env.TWITTER_CONSUMER_KEY,
    consumer_secret:process.env.TWITTER_CONSUMER_SECRET,
    token: process.env.TWITTER_TOKEN,
    token_secret: process.env.TWITTER_TOKEN_SECRET,
  });

  connection.follow('611701456');

  connection.on('tweet', tweet => {
    console.log(
      '--------------------------------------------------------------'
    );
    console.log(`Tweet Received: ${tweet.text}`);

    if (tweet.user.id !== 611701456) {
      console.log(`IGNORED: Just a moron responding to a bot or retweet`);
      return;
    }

    tweetFetcher.fetchFullTweet(tweet).then(fullTweet => {
      const refinedTweet = tweetRefiner(fullTweet);
      Tweet.create(refinedTweet);

      processTweet(refinedTweet, processedTweet => {
        socket.broadcast(processedTweet);
        Incident.create(processedTweet);
      });
    });
  });

  connection.on('error', err => {
    console.log('Oh no', err);
  });
};

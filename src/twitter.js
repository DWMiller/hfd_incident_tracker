const Twitter = require('node-tweet-stream');
const tweetParser = require('./tweet-parser.js');
const tweetRefiner = require('./tweet-refiner.js');
const tweetGeoCoder = require('./tweet-geocoder.js');
const tweetFetcher = require('./tweet-fetcher.js');

const tweetModel = require('./models/tweet.js');
const incidentModel = require('./models/incident.js');

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
  const connection = new Twitter(require('./config/keys').twitter);

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
      tweetModel.create(refinedTweet);

      processTweet(refinedTweet, processedTweet => {
        socket.broadcast(processedTweet);
        incidentModel.create(processedTweet);
      });
    });
  });

  connection.on('error', err => {
    console.log('Oh no', err);
  });
};

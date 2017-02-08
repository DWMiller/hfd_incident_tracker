const tweetParser = require('../src/tweet-parser.js');
const tweetGeoCoder = require('../src/tweet-geocoder.js');

const Incident = require('../src/models/incident.js');
const Tweet = require('../src/models/tweet.js');

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

function processTweets(tweets) {
  processTweet(tweets.pop(), processedTweet => {
    if (processedTweet) {
      console.log(`${tweets.length} remaining: ${processedTweet.intersection}`);
      Incident.create(processedTweet);
    }
  });

  if (tweets.length) {
    setTimeout(
      () => {
        processTweets(tweets);
      },
      1000
    );
  } else {
    console.log('done');
  }
}

//Wipe all existing update data
Incident.find({}).remove().exec();

Tweet.find({}).exec(function(err, tweets) {
  processTweets(tweets);
});

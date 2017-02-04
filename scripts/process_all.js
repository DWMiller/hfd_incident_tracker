const twitter = require('../src/twitter.js');
const Update = require('../src/models/update.js');
const Tweet = require('../src/models/tweet.js');

function processTweets(tweets) {
  twitter.processTweet(tweets.pop(), processedTweet => {
    if (processedTweet) {
      console.log(`${tweets.length} remaining: ${processedTweet.intersection}`);
      Update.create(processedTweet);
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
Update.find({}).remove().exec();

Tweet.find({}).exec(function(err, tweets) {
  processTweets(tweets);
});

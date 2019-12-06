const mongoose = require('../mongoose-connection');

require('../models/Incident.js');
require('../models/Tweet.js');

const Incident = mongoose.model('Incident');
const Tweet = mongoose.model('Tweet');

const { tweetReceiver, incidentPrepper } = require('../twitter/tweetReceiver');

const processTweet = async tweet => {
  //tweet.id_str = tweet.id; // our stored tweets saved id_str as id

  // ! Stop doing this, this script takes already processed tweets, nothing to gain by processing them from themselves
  // const processedTweet = await tweetReceiver(tweet);
  return await incidentPrepper(tweet);
};

async function processTweets(tweets) {
  try {
    await processTweet(tweets.shift());
  } catch (error) {
    console.log(error);
  }

  console.log(`${tweets.length} remaining`);

  if (tweets.length) {
    setTimeout(() => {
      processTweets(tweets);
    }, 1000);
  } else {
    console.log('done');
    process.exit();
  }
}

const run = async () => {
  //Wipe all existing update data
  Incident.find({})
    .remove()
    .exec();

  const tweets = await Tweet.find({})
    .limit(50)
    .sort({
      time: 1,
    });

  processTweets(tweets);
};

run();

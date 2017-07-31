const R = require('ramda');

const mongoose = require('./../src/mongoose-connection');
require('../models/Incident.js');
require('../models/Tweet.js');

const twitterController = require('../controllers/twitterController');

const Incident = require('../models/Incident.js');
const Tweet = require('../models/Tweet.js');

const processTweet = R.pipeP(
  twitterController.parseTweetDetails,
  twitterController.geoCodeTweet,
  twitterController.saveIncident
);

async function processTweets(tweets) {
  try {
    await processTweet(tweets.pop());
  } catch (error) {}

  console.log(`${tweets.length} remaining`);

  if (tweets.length) {
    setTimeout(() => {
      processTweets(tweets);
    }, 1000);
  } else {
    console.log('done');
  }
}

async function run() {
  //Wipe all existing update data
  Incident.find({}).remove().exec();

  const tweets = await Tweet.find();
  processTweets(tweets);
}

run();

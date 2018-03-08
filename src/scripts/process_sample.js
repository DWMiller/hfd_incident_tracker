const R = require('ramda');

// const DAY = 86400000;
// const DAY_AGO = Date.now() - DAY;

const mongoose = require('./../src/mongoose-connection');
require('../models/Incident.js');
require('../models/Tweet.js');

const twitterController = require('../controllers/twitterController');

const { tweet: sampleTweet } = require('./../samples.js');

const log = async x => {
  console.log(x);
  return x;
};

const processTweet = R.pipeP(
  twitterController.cleanTweet,
  twitterController.saveTweet,
  twitterController.parseTweetDetails,
  twitterController.geoCodeTweet,
  twitterController.saveIncident
);

async function test() {
  const processedTweet = await processTweet(sampleTweet);

  console.log(processedTweet);

  if (!processedTweet) {
    return;
  }
}

test();

// const R = require('ramda');

// const DAY = 86400000;
// const DAY_AGO = Date.now() - DAY;

const mongoose = require('../mongoose-connection');
require('../models/Incident.js');
require('../models/Tweet.js');

const { tweetReceiver } = require('../twitter/tweetReceiver');

const { tweet: sampleTweet } = require('./../../samples.js');

async function test() {
  try {
    const processedTweet = tweetReceiver(sampleTweet);

    if (!processedTweet) {
      return;
    }
  } catch (error) {}
}

test();

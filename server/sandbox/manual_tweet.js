const mongoose = require('../mongoose-connection');
require('../models/Incident.js');
require('../models/Tweet.js');

const { tweets } = require('./sample_tweets');

const { tweetReceiver, incidentPrepper } = require('../twitter/tweetReceiver');

const tweet = tweets[0];

const run = async () => {
  const processedTweet = await tweetReceiver(tweet);

  console.log(processedTweet);

  process.exit();

  const processedIncident = await incidentPrepper(processedTweet);

  // console.log(processedIncident);

  process.exit();
};

run();

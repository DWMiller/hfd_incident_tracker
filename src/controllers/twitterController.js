// const ramda = require('ramda');

require('dotenv').config({ path: __dirname + './../variables.env' });

const Twitter = require('node-tweet-stream');

const tweetFetcher = require('../helpers/tweet-fetcher.js').default;
const tweetRefiner = require('../helpers/tweet-refiner.js').default;
const tweetParser = require('../helpers/tweet-parser.js').default;
const tweetGeoCoder = require('../helpers/tweet-geocoder.js').default;

const mongoose = require('mongoose');
const Tweet = mongoose.model('Tweet');
const Incident = mongoose.model('Incident');

const connection = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  token: process.env.TWITTER_TOKEN,
  token_secret: process.env.TWITTER_TOKEN_SECRET,
});

connection.follow('611701456');

//   connection.on('error', err => {
//     console.log('Oh no', err);
//   });

exports.connection = connection;

exports.cleanTweet = async (tweet = {}) => {
  console.log('--------------------------------------------------------------');
  console.log(`Tweet Received:`); // ${tweet.text}`);

  if (tweet.user.id !== 611701456) {
    console.log(`IGNORED: Just a moron responding to a bot or retweet`);
    return;
  }

  const fullTweet = await tweetFetcher(tweet);
  return tweetRefiner(fullTweet);
};

exports.saveTweet = async (tweet = {}) => {
  const newTweet = new Tweet(tweet);

  await newTweet.save();

  return newTweet;
};

exports.parseTweetDetails = async tweet => {
  const parsedTweet = tweetParser(tweet);

  if (parsedTweet.type !== 'NEW') {
    // console.log(`UPDATE ONLY: ${parsedTweet.code}`);
    // not set up to handle event updates yet
    return undefined;
  }

  if (!parsedTweet.intersection) {
    // console.log(`UNHANDLED TWEET:`);
    // not set up to handle event updates yet
    return undefined;
  }

  // console.log(`PARSED: ${parsedTweet.intersection}`);

  return parsedTweet;
};

exports.geoCodeTweet = async tweet => {
  const geoCodedTweet = await tweetGeoCoder(tweet);
  return geoCodedTweet;
  // .then(callback).catch(error => console.log(error));
};

exports.saveIncident = async tweet => {
  const incident = new Incident(tweet);
  await incident.save();
  return incident;
};

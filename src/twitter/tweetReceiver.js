const ramda = require('ramda');

const mongoose = require('mongoose');
const Tweet = mongoose.model('Tweet');
const Incident = mongoose.model('Incident');

const { tweetFilter } = require('./tweetFilter');
const { tweetFetcher } = require('./tweetFetcher.js');
const { tweetRefiner } = require('./tweetRefiner.js');
const { tweetParser } = require('./tweetParser.js');
const { tweetGeoCoder } = require('./tweetGeocoder.js');

const { log } = require('../helpers');

const saveTweet = async (tweet = {}) => {
  const newTweet = new Tweet(tweet);
  await newTweet.save();
  return newTweet;
};

const saveIncident = async (tweet = {}) => {
  const incident = new Incident(tweet);
  await incident.save();
  return incident;
};

exports.tweetReceiver = ramda.pipeP(tweetFilter, tweetFetcher, tweetRefiner, saveTweet);

exports.incidentPrepper = ramda.pipeP(tweetParser, tweetGeoCoder, saveIncident);

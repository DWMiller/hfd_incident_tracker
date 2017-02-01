const Twitter = require('node-tweet-stream');
const tweetParser = require('./tweet-parser.js');
const tweetRefiner = require('./tweet-refiner.js');
const tweetGeoCoder = require('./tweet-geocoder.js');

const db = require('./database.js');

function connect() {
  return new Twitter({
    consumer_key: '7IbK7hgaJ08LYSnI3ZqZm0T64',
    consumer_secret: 'FgSu5C0gIDyTKEPgJ8PtioxSUsXLhmiW6EJRd3JB5uSQUsBLXd',
    token: '717764605-fXFnaMzIVzRtYsXPLCSH1rP2KV4P3wk5UOam5fZE',
    token_secret: 'Gy0OTh4HyP0y3spZFawkqOZsuZnRus3CTyV4YvUaZuaqt'
  });
}

function handleTweet(tweet, callback) {
  const refinedTweet = tweetRefiner(tweet);

  console.log(`Tweet Received: ${tweet.text}`);

  db.tweets.insert(refinedTweet);

  if (/goo\.gl/.test(refinedTweet.text)) {
    // Can't yet handle content if externerally linked, skip it
    return;
  }

  const parsedTweet = tweetParser(refinedTweet);

  tweetGeoCoder(parsedTweet).then(({ geometry, formatted_address }) => {
    const geoCodedTweet = Object.assign({}, parsedTweet, {
      coordinates: geometry.location,
      formatted_address
    });

    db.updates.insert(geoCodedTweet, (err, newDoc) => {
      callback(newDoc);
    });
  });
}

module.exports = { connect, handleTweet };

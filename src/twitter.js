const Twitter = require('node-tweet-stream');
const tweetParser = require('./parser.js');
const db = require('./database.js');

const geocoder = require('geocoder');

const connection = new Twitter({
  consumer_key: '7IbK7hgaJ08LYSnI3ZqZm0T64',
  consumer_secret: 'FgSu5C0gIDyTKEPgJ8PtioxSUsXLhmiW6EJRd3JB5uSQUsBLXd',
  token: '717764605-fXFnaMzIVzRtYsXPLCSH1rP2KV4P3wk5UOam5fZE',
  token_secret: 'Gy0OTh4HyP0y3spZFawkqOZsuZnRus3CTyV4YvUaZuaqt',
});

/**
 * Fields in a tweet we actually care about and want to preserve when stored
 */
const refinedFields = ['id', 'text', 'timestamp_ms'];

function handleTweet(tweet, callback) {
  const refinedTweet = refine(tweet);

  console.log(`Tweet Received: ${tweet.text}`);

  db.tweets.insert(refinedTweet);

  if (/goo\.gl/.test(refinedTweet.text)) {
        // Can't yet handle content if externerally linked, skip it
    return;
  }

  const parsedTweet = parse(refinedTweet);

  geocode(parsedTweet, (t) => {
    db.updates.insert(tweet, () => {
      callback(t);
    });
  });
}

function geocode(tweet, callback) {
  const useField = tweet.intersection;

    // if (tweet.locationName) {
    // CN field is not neccessarily correct or listed in google,
    // should attempt to resolve it but need to fall back to intersection on failure
    //     useField = tweet.locationName + ', ' + tweet.city
    // }

  geocoder.geocode(useField, (err, data) => {
    if (!data) {
      console.log('Geolocation Error A :', err, useField);
      return;
    }

    const result = data.results[0];

    const geoCodedTweet = Object.assign({}, tweet, {
      coordinates: result.geometry.location,
      formatted_address: result.formatted_address,
    }, tweet);

    if (result) {
      callback(geoCodedTweet);
    } else {
      console.log('Geolocation Error B :', data, err, useField);
      callback(false);
    }
  }, {
    key: 'AIzaSyBDX9TpI_4wnD1Q-JVmLjfhc9B-vPgwc0Y',
  });
}
/**
 * Returns new object containing only relevant fields of tweet
 */
function refine(tweet) {
  const obj = {};

  refinedFields.forEach((field) => {
    if (Object.hasOwnProperty.call(tweet, field)) {
      obj[field] = tweet[field];
    }
  });

  return obj;
}

function parse(tweet) {
  return tweetParser(tweet);
}

module.exports = {
  connection,
  handleTweet,
  geocode,
  refine,
  parse,
};

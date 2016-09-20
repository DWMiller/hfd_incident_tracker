var Twitter = require('node-tweet-stream');
var tweetParser = require('./parser.js');
var db = require('./database.js');

var geocoder = require('geocoder');

var connection = new Twitter({
    consumer_key: '7IbK7hgaJ08LYSnI3ZqZm0T64',
    consumer_secret: 'FgSu5C0gIDyTKEPgJ8PtioxSUsXLhmiW6EJRd3JB5uSQUsBLXd',
    token: '717764605-fXFnaMzIVzRtYsXPLCSH1rP2KV4P3wk5UOam5fZE',
    token_secret: 'Gy0OTh4HyP0y3spZFawkqOZsuZnRus3CTyV4YvUaZuaqt'
})

/**
 * Fields in a tweet we actually care about and want to preserve when stored
 */
const refinedFields = ['id', 'text', 'timestamp_ms'];

function handleTweet(tweet, callback) {
    tweet = refine(tweet);

    console.log('Tweet Received: ' + tweet.text);

    db.tweets.insert(tweet)

    if (/goo\.gl/.test(tweet.text)) {
        // Can't yet handle content if externerally linked, skip it
        return;
    }

    tweet = parse(tweet);

    geocode(tweet, (tweet) => {
        db.updates.insert(tweet, () => {
            // console.log('event logged, ID: ' + tweet.id);
            callback(tweet);
        })
    });

}

function geocode(tweet, callback) {
    let useField = tweet.intersection;

    // if (tweet.locationName) {
    //CN field is not neccessarily correct or listed in google,
    // should attempt to resolve it but need to fall back to intersection on failure
    //     useField = tweet.locationName + ', ' + tweet.city
    // }

    geocoder.geocode(useField, function(err, data) {
        if (!data) {
            console.log('Geolocation Error A :', err, useField);
            return;
        }

        let result = data.results[0];

        if (result) {
            tweet.coordinates = result.geometry.location;
            tweet.formatted_address = result.formatted_address;

            callback(tweet);
        } else {
            console.log('Geolocation Error B :', data, err, useField);
            callback(false);
        }

    }, {
        key: "AIzaSyBDX9TpI_4wnD1Q-JVmLjfhc9B-vPgwc0Y"
    });
}
/**
 * Returns new object containing only relevant fields of tweet
 */
function refine(tweet) {
    let obj = {};

    refinedFields.forEach((field) => {
        if (tweet.hasOwnProperty(field)) {
            obj[field] = tweet[field];
        }
    })

    return obj;
}

function parse(tweet) {
    return tweetParser(tweet)
}

module.exports = {
    connection,
    handleTweet,
    geocode,
    refine,
    parse,
}

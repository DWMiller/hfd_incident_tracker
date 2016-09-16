var Twitter = require('node-tweet-stream');
var tweetParser = require('./parser.js');
var db = require('./database.js');

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

function handleTweet(tweet) {
    tweet = refine(tweet);

    console.log(tweet);

    db.tweets.insert(tweet, () =>
        console.log('tweet logged, ID: ' + tweet.id));

    if (/goo\.gl/.test(tweet.text)) {
        // Can't yet handle content if externerally linked, skip it
        return tweet;
    }

    tweet = parse(tweet);

    db.updates.insert(tweet, () =>
        console.log('event logged, ID: ' + tweet.id));

    return tweet;
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
    refine,
    parse,
}

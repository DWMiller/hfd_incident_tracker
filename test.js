var sample = require('./src/sample.js');
var tweetParser = require('./src/parser.js');

var db = require('./src/database.js');

function handleTweet(tweet) {
    let parsed = tweetParser(tweet);
}

handleTweet(sample);

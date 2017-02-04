const twitter = require('./src/twitter.js');

const db = require('./src/nedb.js');
const mongo = require('./src/mongodb.js');

const express = require('express');
const path = require('path');
const app = express();

const server = require('http').createServer(app);

const port = process.env.PORT || 3001;

const socket = require('./src/socket.js')(server);

server.listen(port, function() {
  console.log('Server listening at port %d', port);
});

app.use(express.static(path.join(__dirname, 'build')));

const twitterConnection = twitter.connect();

twitterConnection.follow('611701456');

twitterConnection.on('tweet', tweet => {
  console.log('--------------------------------------------------------------');
  console.log(`Tweet Received: ${tweet.text}`);

  if (tweet.user.id !== 611701456) {
    console.log(`IGNORED: Just a moron responding to a bot or retweet`);
    return;
  }

  twitter.fetchFullTweet(tweet).then(fullTweet => {
    const refinedTweet = twitter.refineTweet(fullTweet);
    mongo.saveToMongo(refinedTweet);
    db.tweets.insert(refinedTweet);

    twitter.processTweet(refinedTweet, processedTweet => {
      socket.broadcast(processedTweet);
      db.updates.insert(processedTweet);
    });
  });
});

twitterConnection.on('error', err => {
  console.log('Oh no', err);
});

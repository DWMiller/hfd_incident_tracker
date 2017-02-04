const twitter = require('./src/twitter.js');

const db = require('./src/nedb.js');

const express = require('express');
const path = require('path');
const app = express();

const server = require('http').createServer(app);

const port = process.env.PORT || 3001;

const socket = require('./src/socket.js')(server);

const tweetModel = require('./src/models/tweet.js');
const updateModel = require('./src/models/update.js');

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
    db.tweets.insert(refinedTweet);
    tweetModel.create(refinedTweet);

    twitter.processTweet(refinedTweet, processedTweet => {
      socket.broadcast(processedTweet);
      updateModel.create(processedTweet);
      db.updates.insert(processedTweet);
    });
  });
});

twitterConnection.on('error', err => {
  console.log('Oh no', err);
});

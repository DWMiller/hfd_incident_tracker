const twitter = require('./src/twitter.js');

const db = require('./src/database.js');

const express = require('express');
const path = require('path');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3001;

server.listen(port, function() {
  console.log('Server listening at port %d', port);
});

app.use(express.static(path.join(__dirname, 'build')));

function tweetProcessed(tweet) {
  console.log(`Broadcast: ${tweet.intersection}`);
  io.sockets.emit('event', tweet);
  db.updates.insert(tweet);
}

const twitterConnection = twitter.connect();

twitterConnection.follow('611701456');

twitterConnection.on('tweet', tweet => {
  console.log('--------------------------------------------------------------');
  console.log(`Tweet Received: ${tweet.text}`);

  if (tweet.user.id !== 611701456) {
    console.log(`IGNORED: Just a moron responding to a bot or retweet`);
    return;
  }

  const refinedTweet = twitter.refineTweet(tweet);
  db.tweets.insert(refinedTweet);

  if (/t\.co/.test(refinedTweet.text)) {
    twitter.fetchFullTweet(refinedTweet).then(fullTweet => {
      twitter.handleTweet(fullTweet, tweetProcessed);
      return;
    });
  }

  twitter.handleTweet(refinedTweet, tweetProcessed);
});

twitterConnection.on('error', err => {
  console.log('Oh no', err);
});

const DAY = 86400000;
const DAY_AGO = Date.now() - DAY;

function getRecentEvents(callback) {
  db.updates.find(
    {
      $where() {
        return this.time > DAY_AGO;
      },
      type: 'NEW'
    },
    callback
  );
}

function initialEmit(socket) {
  getRecentEvents((err, docs) => {
    socket.emit('events', docs);
  });
}

function attachSocketListeners(socket) {
  socket.on('all_events', () => {
    initialEmit(socket);
  });
}

io.on('connection', socket => {
  attachSocketListeners(socket);
  socket.emit('connected');
});

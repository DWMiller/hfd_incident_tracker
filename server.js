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

const twitterConnection = twitter.connect();
twitterConnection.follow('611701456');

twitterConnection.on('tweet', tweet => {
  console.log(`Tweet Received: ${tweet.text}`);

  const refinedTweet = twitter.refineTweet(tweet);
  db.tweets.insert(refinedTweet);

  if (/goo\.gl/.test(refinedTweet.text)) {
    // Can't yet handle content if externerally linked, skip it
    return;
  }

  const parsedTweet = twitter.parseTweet(refinedTweet);

  twitter
    .geoCodeTweet(parsedTweet)
    .then(geoCodedTweet => {
      db.updates.insert(geoCodedTweet, (err, newDoc) => {
        console.log(`Update pushed: ${geoCodedTweet.intersection}`);
        io.sockets.emit('event', newDoc);
      });
    })
    .catch(error => console.log(error));
});

twitterConnection.on('error', err => {
  console.log('Oh no', err);
});

const DAY = 86400000;
const DAY_AGO = Date.now() - DAY;

function getRecentEvents(callback) {
  db.updates.find(
    {
      // $where() {
      //   return this.time > DAY_AGO * 3;
      // }
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

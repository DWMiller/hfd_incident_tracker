const twitter = require('./src/twitter.js');
const db = require('./src/database.js');

const io = require('socket.io')(process.env.PORT);

twitter.connection.on('tweet', tweetReceived);

twitter.connection.on('error', err => {
  console.log('Oh no', err);
});

twitter.connection.follow('611701456');

function tweetReceived(tweet) {
  twitter.handleTweet(tweet, tweetProcessed);
}

function tweetProcessed(tweet) {
  console.log(`Update pushed: ${tweet.intersection}`);
  io.emit('event', tweet);
}

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

io.sockets.on('connection', socket => {
  attachSocketListeners(socket);
  socket.emit('connected');
});

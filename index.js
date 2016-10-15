const twitter = require('./src/twitter.js');
const db = require('./src/database.js');

const express = require('express'); // call express

const app = express(); // define our app using express

const http = require('http');

const server = http.createServer(app);
const io = require('socket.io').listen(server);

server.listen(80); // process.env.PORT || 8081);

app.use(express.static(`${__dirname}/public`));

twitter.connection.on('tweet', tweetReceived);

twitter.connection.on('error', (err) => {
  console.log('Oh no', err);
});

twitter.connection.follow('611701456');

const DAY = 86400000;
const DAY_AGO = (Date.now() - DAY);
// Create web sockets connection.
io.sockets.on('connection', onConnect);

function onConnect(socket) {
  socket.on('all_events', () => {
    db.updates.find({
      type: 'NEW',
      $where() {
        return this.time > DAY_AGO;
      },
    }, (err, docs) => {
      socket.emit('events', docs);
    });
  });

    // Emits signal to the client telling them that the
    // they are connected and can start receiving data
  socket.emit('connected');
}

function tweetReceived(tweet) {
  twitter.handleTweet(tweet, tweetProcessed);
}

function tweetProcessed(tweet) {
  console.log(`Update pushed: ${tweet.intersection}`);
  io.emit('event', tweet);
}

const updateModel = require('./models/update.js');

const DAY = 86400000;
const DAY_AGO = Date.now() - DAY;

function getRecentEvents(callback) {
  updateModel.find({ time: { $gte: DAY_AGO } }, function(err, updates) {
    callback(updates);
  });
}

function initialEmit(socket) {
  getRecentEvents(docs => {
    socket.emit('events', docs);
  });
}

function attachSocketListeners(socket) {
  socket.on('all_events', () => {
    initialEmit(socket);
  });

  socket.on('ping', () => {
    console.log('activity ping');
  });
}

module.exports = function(server) {
  const io = require('socket.io')(server);

  io.on('connection', socket => {
    attachSocketListeners(socket);
    socket.emit('connected');
  });

  return {
    broadcast(tweet) {
      io.sockets.emit('event', tweet);
      console.log(`Broadcast: ${tweet.intersection}`);
    }
  };
};

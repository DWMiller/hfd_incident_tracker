const db = require('./nedb.js');
const updateModel = require('./models/update.js');

const DAY = 86400000;
const DAY_AGO = Date.now() - DAY;

function getRecentEvents(callback) {
  updateModel.find({}, function(err, updates) {
    console.log(updates);
    callback(updates);
  });
  // db.updates.find(
  //   {
  //     $where() {
  //       return this.time > DAY_AGO;
  //     },
  //     type: 'NEW'
  //   },
  //   callback
  // );
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

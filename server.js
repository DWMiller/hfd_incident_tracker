const express = require('express');
const ramda = require('ramda');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

const mongoose = require('./src/mongoose-connection');

require('./models/Tweet');
require('./models/Incident');

const app = require('./app');
app.set('port', process.env.PORT || 3001);

const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

const io = require('socket.io')(server);

// io.on('connection', socket => {
//   socket.emit('connected');
// });

const twitterController = require('./controllers/twitterController');
const twitterConnection = twitterController.connection;

// const log = async x => {
//   console.log(x);
//   return x;
// };

const processTweet = ramda.pipeP(
  twitterController.cleanTweet,
  twitterController.saveTweet,
  twitterController.parseTweetDetails,
  twitterController.geoCodeTweet,
  twitterController.saveIncident
);

twitterConnection.on('tweet', async tweet => {
  try {
    const processedTweet = await processTweet(tweet);
    io.sockets.emit('event', processedTweet);
    console.log(`Broadcast: ${processedTweet.location.addresss}`);
  } catch (error) {
    console.log(`E - ${error}`);
  }
});

// const maintenance = require('./src/maintenance.js');
// maintenance.deletedOld();

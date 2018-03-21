// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

const mongoose = require('./mongoose-connection');

require('./models/Tweet');
require('./models/Incident');

const app = require('./app');

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`Koa Running → PORT ${server.address().port} -> Started at: ${new Date()}`);
});

const io = require('socket.io')(server);

// io.on('connection', socket => {
//   socket.emit('connected');
// });

const { connect } = require('./twitter/twitterConnector');
const { tweetReceiver } = require('./twitter/tweetReceiver');

const handleTweet = async tweet => {
  try {
    const incidentData = await tweetReceiver(tweet);
    io.sockets.emit('event', incidentData);
    console.log(`Broadcast: ${incidentData.location.address}`);
  } catch (error) {
    console.log(`E - ${error}`);
  }
};

const connection = connect(
  {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    token: process.env.TWITTER_TOKEN,
    token_secret: process.env.TWITTER_TOKEN_SECRET,
  },
  handleTweet
);

// const maintenance = require('./src/maintenance.js');
// maintenance.deletedOld();

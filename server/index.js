// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

const mongoose = require('./mongoose-connection');

require('./models/Tweet');
require('./models/Incident');

const { KEYS, setData, getData } = require('./dataStore');

const app = require('./app');

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`Express Running → PORT ${server.address().port} -> Started at: ${new Date()}`);
});

const io = require('socket.io')(server);

const { connect } = require('./twitter/twitterConnector');
const { tweetReceiver, incidentPrepper } = require('./twitter/tweetReceiver');

const handleTweet = async tweet => {
  if (process.env.NODE_ENV === 'development') {
    return null;
  }

  try {
    const processedTweet = await tweetReceiver(tweet);
    const incident = await incidentPrepper(processedTweet);

    let storedIncidents = getData(KEYS.RECENT_INCIDENTS);

    if (storedIncidents) {
      setData(KEYS.RECENT_INCIDENTS, [incident, ...storedIncidents.slice(0, 500)]);
    }

    io.sockets.emit('incident', incident);
    console.log(`Broadcast: ${incident.location.address}`);
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

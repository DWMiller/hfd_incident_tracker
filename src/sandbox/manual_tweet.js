const mongoose = require('../mongoose-connection');
require('../models/Incident.js');
require('../models/Tweet.js');

const { tweetReceiver,incidentPrepper } = require('../twitter/tweetReceiver');

const tweet = {
  created_at: new Date(),
  id_str: '976490090154295298',
  text:
    'NEW | F18016486 | VEHICLE ACC | Loc: SC @ KING ST E/ROSEDALE DR | Units: E12,R12 | 05/07/18 15:22',
  user: { id: 611701456 },
};


const processedTweet = await tweetReceiver(tweet);
incidentPrepper(processedTweet);

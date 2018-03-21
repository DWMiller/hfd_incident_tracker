const mongoose = require('../mongoose-connection');
require('../models/Incident.js');
require('../models/Tweet.js');

const { tweetReceiver } = require('../twitter/tweetReceiver');

const tweet = {
  created_at: new Date(),
  id_str: '976490090154295298',
  text:
    'NEW | F18010587 | CO DETECTOR | Loc: 28 WELLINGTON ST S DU @ JAMES ST/HATT ST | Units: E23 | 03/21/18 12:02',
  user: { id: 611701456 },
};

tweetReceiver(tweet);

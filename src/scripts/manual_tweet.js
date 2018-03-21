const mongoose = require('../mongoose-connection');
require('../models/Incident.js');
require('../models/Tweet.js');

const { tweetReceiver } = require('../twitter/tweetReceiver');

const tweet = {
  created_at: new Date(),
  id_str: '976271847674310656',
  text:
    'NEW | F18010495 | MEDICAL | Loc: 0 Block MACNAB ST S HAM @ KING ST W/MAIN ST W /CN: HSR BUS TERMINAL | Units: R1 | 03/20/18 21:36',
  user: { id: 611701456 },
};

tweetReceiver(tweet);

const mongoose = require('../mongoose-connection');
require('../models/Incident.js');
require('../models/Tweet.js');

const { tweetReceiver, incidentPrepper } = require('../twitter/tweetReceiver');

exampleTweet1 =
  'NEW | F18016486 | VEHICLE ACC | Loc: SC @ KING ST E/ROSEDALE DR | Units: E12,R12 | 05/07/18 15:22';
exampleTweet2 =
  'NEW | F18017829 | ALARM CONDITIONS | Loc: 115 MAIN ST E HAM @ CATHARINE ST S/WALNUT ST S /CN: KENSINGTON APTS | Units: L1,R1 | 05/17/18 14:53';

const tweet = {
  created_at: new Date(),
  id_str: '976490090154295298',
  text: exampleTweet2,
  user: { id: 611701456 },
};

const run = async () => {
  const processedTweet = await tweetReceiver(tweet);
  const processedIncident = await incidentPrepper(processedTweet);

  // console.log(processedIncident);

  process.exit();
};

run();

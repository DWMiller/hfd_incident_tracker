const mongoose = require('../src/mongoose-connection');

const Tweet = require('../models/Tweet');
const Incident = require('../models/Incident');

// const DAY = 86400000;
// const TWO_DAYS_AGO = Date.now() - DAY * 2;

Incident.find({}).remove().exec();
Tweet.find({}).remove().exec();

// db.updates.remove(
//   {
//     $where() {
//       return this.time < TWO_DAYS_AGO;
//     },
//   },
//   {
//     multi: true,
//   }
// );

// db.tweets.remove(
//   {
//     $where() {
//       return this.timestamp_ms < TWO_DAYS_AGO;
//     },
//   },
//   {
//     multi: true,
//   }
// );

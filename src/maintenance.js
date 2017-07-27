const Tweet = require('./models/Tweet.js');
const Incident = require('./models/Incident.js');

const DAY = 86400000;
const WEEK = DAY * 7;

const ONE_DAY_AGO = Date.now() - DAY;
const TWO_DAYS_AGO = ONE_DAY_AGO - DAY;
const ONE_WEEK_AGO = Date.now() - WEEK;

const api = {
  // deletedOld: () => {
  //   console.log('Maintenance: Old database data cleared');
  //   Incident.find({
  //     time: { $lt: ONE_WEEK_AGO },
  //   })
  //     .remove()
  //     .exec();
  //   Tweet.find({
  //     timestamp_ms: { $lt: ONE_WEEK_AGO },
  //   })
  //     .remove()
  //     .exec();
  // },
};

module.exports = api;

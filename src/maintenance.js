const tweetModel = require('./models/tweet.js');
const incidentModel = require('./models/incident.js');

const DAY = 86400000;
const ONE_DAY_AGO = Date.now() - DAY;
const TWO_DAYS_AGO = ONE_DAY_AGO - DAY;

const api = {
  deletedOld: () => {
    console.log('Maintenance: Old database data cleared');
    incidentModel
      .find({
        time: { $lt: TWO_DAYS_AGO }
      })
      .remove()
      .exec();

    tweetModel
      .find({
        timestamp_ms: { $lt: TWO_DAYS_AGO }
      })
      .remove()
      .exec();
  }
};

module.exports = api;

const tweetModel = require('./models/tweet.js');
const updateModel = require('./models/update.js');

const DAY = 86400000;
const TWO_DAYS_AGO = Date.now() - DAY * 2;

const api = {
  deletedOld: () => {
    console.log('Maintenance: Old database data cleared');
    updateModel
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

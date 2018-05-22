const mongoose = require('mongoose');
const Incident = mongoose.model('Incident');

const DAY = 86400000;
const DAY_AGO = Date.now() - DAY;
const WEEK_AGO = Date.now() - DAY * 7;
const YEAR_AGO = Date.now() - DAY * 365;

const { KEYS, setData, getData } = require('../dataStore');

exports.recent = async (ctx, next) => {
  let incidents = getData(KEYS.RECENT_INCIDENTS);

  if (!incidents) {
    incidents = await Incident.find({ updated: { $gte: WEEK_AGO } })
      .sort({
        updated: 'desc',
      })
      .limit(100);

    setData(KEYS.RECENT_INCIDENTS, incidents);
  }

  ctx.body = incidents;
};

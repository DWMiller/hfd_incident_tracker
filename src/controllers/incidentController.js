const mongoose = require('mongoose');
const Incident = mongoose.model('Incident');

const DAY = 86400000;
const DAY_AGO = Date.now() - DAY;
const WEEK_AGO = Date.now() - DAY * 7;
const YEAR_AGO = Date.now() - DAY * 365;

const { KEYS, setData, getData } = require('../dataStore');

exports.recent = async (req, res, next) => {
  let incidents = getData(KEYS.RECENT_INCIDENTS);

  if (!incidents) {
    incidents = await Incident.find({ created: { $gte: WEEK_AGO } }).sort({
      updated: 'desc',
    });

    setData(KEYS.RECENT_INCIDENTS, incidents);
  }

  res.json(incidents);
};

exports.incident = async (req, res, next) => {
  const code = req.params.code;

  const incident = await Incident.findOne({ code });

  res.json(incident);
};

const mongoose = require('mongoose');
const Incident = mongoose.model('Incident');

const DAY = 86400000;
const DAY_AGO = Date.now() - DAY;
const YEAR_AGO = Date.now() - DAY * 365;

exports.recent = async (req, res) => {
  const incidents = await Incident.find({ updated: { $gte: YEAR_AGO } });
  res.json(incidents);
};

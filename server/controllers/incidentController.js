const { getIncidents, getIncidentByCode } = require('../arcgis/arcgisPoller');

exports.recent = async (req, res) => {
  res.json(getIncidents());
};

exports.incident = async (req, res) => {
  const incident = getIncidentByCode(req.query.code);
  res.json(incident);
};

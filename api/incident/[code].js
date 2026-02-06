const { mapFeature } = require('../../server/arcgis/mapFeature');

const ARCGIS_BASE =
  'https://spatialsolutions.hamilton.ca/webgis/rest/services/HFDIncidents/HFDIncidents/MapServer/0/query' +
  '?outFields=*' +
  '&f=geojson' +
  '&outSR=4326';

module.exports = async function handler(req, res) {
  const { code } = req.query;

  // Sanitize: EVENT_NUM should be alphanumeric with possible dashes
  if (!code || !/^[\w-]+$/.test(code)) {
    return res.status(400).json({ error: 'Invalid incident code' });
  }

  try {
    const url = `${ARCGIS_BASE}&where=EVENT_NUM='${code}'`;
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(502).json({ error: 'ArcGIS unavailable' });
    }

    const geojson = await response.json();
    const feature = (geojson.features || [])[0];

    if (!feature) {
      return res.status(404).json(null);
    }

    res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=30');
    return res.json(mapFeature(feature));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const { mapFeature } = require('../server/arcgis/mapFeature');

const ARCGIS_URL =
  'https://spatialsolutions.hamilton.ca/webgis/rest/services/HFDIncidents/HFDIncidents/MapServer/0/query' +
  '?where=1=1' +
  '&outFields=*' +
  '&f=geojson' +
  '&outSR=4326' +
  '&orderByFields=DATE_TIME+DESC' +
  '&resultRecordCount=2000';

module.exports = async function handler(req, res) {
  try {
    const response = await fetch(ARCGIS_URL);
    if (!response.ok) {
      return res.status(502).json({ error: 'ArcGIS unavailable' });
    }

    const geojson = await response.json();
    const incidents = (geojson.features || [])
      .map(mapFeature)
      .filter(i => i.category);

    res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=30');
    return res.json(incidents);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

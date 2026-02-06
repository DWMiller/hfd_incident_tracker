const { mapFeature } = require('./mapFeature');

const ARCGIS_URL =
  'https://spatialsolutions.hamilton.ca/webgis/rest/services/HFDIncidents/HFDIncidents/MapServer/0/query' +
  '?where=1=1' +
  '&outFields=*' +
  '&f=geojson' +
  '&outSR=4326' +
  '&orderByFields=DATE_TIME+DESC' +
  '&resultRecordCount=2000';

const POLL_INTERVAL = parseInt(process.env.ARCGIS_POLL_INTERVAL, 10) || 30000;

const incidents = new Map();
let knownEventNums = new Set();

async function poll(onNewIncidents) {
  try {
    const res = await fetch(ARCGIS_URL);
    if (!res.ok) {
      console.log(`ArcGIS poll failed: ${res.status}`);
      return;
    }

    const geojson = await res.json();
    const features = geojson.features || [];

    const currentEventNums = new Set();
    const newIncidents = [];

    for (const feature of features) {
      const mapped = mapFeature(feature);
      currentEventNums.add(mapped.code);
      incidents.set(mapped.code, mapped);

      if (!knownEventNums.has(mapped.code)) {
        newIncidents.push(mapped);
      }
    }

    // Remove incidents no longer in the feed
    for (const code of knownEventNums) {
      if (!currentEventNums.has(code)) {
        incidents.delete(code);
      }
    }

    knownEventNums = currentEventNums;

    if (newIncidents.length > 0 && onNewIncidents) {
      onNewIncidents(newIncidents);
    }

    console.log(`ArcGIS poll: ${features.length} total, ${newIncidents.length} new`);
  } catch (err) {
    console.log(`ArcGIS poll error: ${err.message}`);
  }
}

function startPolling(onNewIncidents) {
  // Initial poll
  poll(onNewIncidents);
  return setInterval(() => poll(onNewIncidents), POLL_INTERVAL);
}

function getIncidents() {
  return Array.from(incidents.values());
}

function getIncidentByCode(code) {
  return incidents.get(code) || null;
}

module.exports = { startPolling, getIncidents, getIncidentByCode };

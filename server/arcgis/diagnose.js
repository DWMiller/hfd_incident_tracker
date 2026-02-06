/**
 * Diagnostic tool: checks ArcGIS category mapping coverage.
 * Usage: node server/arcgis/diagnose.js
 *
 * Reports:
 *   - All raw TYPE_OF_CALL values from ArcGIS with counts
 *   - Parsed categories after alias resolution, with mapping status
 *   - Any categories that will display as UNKNOWN on the frontend
 */

const { mapFeature } = require('./mapFeature');

const ARCGIS_URL =
  'https://spatialsolutions.hamilton.ca/webgis/rest/services/HFDIncidents/HFDIncidents/MapServer/0/query' +
  "?where=DISPLAY_STATUS<>'Do Not Display'" +
  '&outFields=*&f=geojson&outSR=4326&resultRecordCount=2000';

// Parse incident-definitions.js (ESM) to get known keys
const fs = require('fs');
const path = require('path');
const defsPath = path.join(__dirname, '../../react-ui/src/config/incident-definitions.js');
const defsSource = fs.readFileSync(defsPath, 'utf8');
const match = defsSource.match(/export const incidentDefinitions = ({[\s\S]+});/);
const defs = eval('(' + match[1] + ')');

async function diagnose() {
  const res = await fetch(ARCGIS_URL);
  const geojson = await res.json();

  const rawTypes = {};
  const parsedCategories = {};

  for (const f of geojson.features) {
    const raw = f.properties.TYPE_OF_CALL || 'null';
    rawTypes[raw] = (rawTypes[raw] || 0) + 1;

    const mapped = mapFeature(f);
    parsedCategories[mapped.category] = (parsedCategories[mapped.category] || 0) + 1;
  }

  console.log('=== RAW TYPE_OF_CALL values ===');
  Object.entries(rawTypes)
    .sort((a, b) => b[1] - a[1])
    .forEach(([k, v]) => console.log(`  ${String(v).padStart(4)}x  ${k}`));

  console.log('\n=== PARSED categories (after alias resolution) ===');
  Object.entries(parsedCategories)
    .sort((a, b) => b[1] - a[1])
    .forEach(([k, v]) => {
      const status = defs[k] ? '\x1b[32mOK\x1b[0m' : '\x1b[31mUNMAPPED\x1b[0m';
      console.log(`  ${String(v).padStart(4)}x  [${status}]  ${k}`);
    });

  const unmapped = {};
  for (const [cat, count] of Object.entries(parsedCategories)) {
    if (!defs[cat]) unmapped[cat] = count;
  }

  if (Object.keys(unmapped).length > 0) {
    console.log('\n=== UNMAPPED categories (showing as UNKNOWN) ===');
    Object.entries(unmapped)
      .sort((a, b) => b[1] - a[1])
      .forEach(([k, v]) => console.log(`  ${String(v).padStart(4)}x  ${k}`));
  } else {
    console.log('\n\x1b[32mAll categories mapped!\x1b[0m');
  }

  const total = geojson.features.length;
  const totalUnmapped = Object.values(unmapped).reduce((a, b) => a + b, 0);
  console.log(`\nTotal: ${total} | Mapped: ${total - totalUnmapped} | Unmapped: ${totalUnmapped} (${((100 * totalUnmapped) / total).toFixed(1)}%)`);
}

diagnose();

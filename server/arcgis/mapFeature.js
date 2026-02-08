// Maps ArcGIS subtypes to our incident-definitions.js category keys.
// Run `node server/arcgis/diagnose.js` to find unmapped categories.
const CATEGORY_ALIASES = {
  // Medical
  'MEDICAL ASSISTANCE': 'MEDICAL',
  'MEDICAL ASSISTANCE - HIGHWAY': 'MEDICAL',
  'MARINE RESPONSE - MEDICAL': 'MEDICAL',

  // Detector activations
  'SMOKE/CO DETECTOR ACTIVATION': 'SMOKE DETECTOR',
  'CARBON MONOXIDE DETECTOR ACTIVATION': 'CO DETECTOR',

  // Fire variants
  'BURNING COMPLAINT': 'BURN COMPLAINT',
  'GRASS/BRUSH FIRE': 'GRASS FIRE',
  'GRASS/BRUSH FIRE - HIGHWAY': 'GRASS FIRE',
  'SMOKE CONDITIONS': 'SMOKE',
  'FIRE REPORTED OUT': 'FIRE OUT',
  'STRUCTURE FIRE - SHED/GARAGE': 'STRUCTURE FIRE',
  'STRUCTURE FIRE - SHELTER/TENT': 'STRUCTURE FIRE',
  'VEHICLE FIRE - HIGHWAY': 'VEHICLE FIRE',
  'UNKNOWN SITUATION': 'UNKNOWN FIRE',

  // Motor vehicle collisions
  'MOTOR VEHICLE COLLISION - FIRST AID': 'VEHICLE COLLISION',
  'MOTOR VEHICLE COLLISION - FIRST AID - HIGHWAY': 'VEHICLE COLLISION',
  'MOTOR VEHICLE COLLISION - PATIENT TRAPPED': 'VEHICLE COLLISION',
  'MOTOR VEHICLE COLLISION - PATIENT TRAPPED - HIGHWAY': 'VEHICLE COLLISION',

  // Gas / hazmat
  'NATURAL GAS/PROPANE - MINOR': 'NATURAL GAS',
  'NATURAL GAS/PROPANE - MAJOR': 'NATURAL GAS',
  'GASOLINE/OIL - SPILL/FIRE - MINOR': 'GAS SPILL',
  'HAZMAT RESPONSE': 'HAZMAT',
  'ODOUR INVESTIGATION': 'ODOURS',

  // Hydro / electrical
  'HYDRO POLE PROBLEM': 'HYDRO PROBLEM',

  // Rescue
  'ROPE RESCUE (HARR)': 'ROPE RESCUE',
  'INDUSTRIAL RESCUE': 'FD ASSISTANCE',

  // Assistance / other
  'ASSISTANCE REQUIRED': 'FD ASSISTANCE',
  'TRAIL RESPONSE': 'FD ASSISTANCE',
  'MUTUAL AID': 'FD ASSISTANCE',
  'FLOOD CONDITIONS': 'FLOODING',

  // Test events — filtered out downstream (no category match)
  'TEST EVENT - PRIORITY 1': 'TEST',
};

function parseCategory(typeOfCall) {
  if (!typeOfCall) return 'UNKNOWN';
  const parts = typeOfCall.split(' - ');
  const subtype = (parts.length > 1 ? parts.slice(1).join(' - ') : parts[0]).trim();
  return CATEGORY_ALIASES[subtype] || subtype;
}

function mapFeature(feature) {
  const { properties, geometry } = feature;

  const streets = [properties.XSTREET_1, properties.XSTREET_2].filter(Boolean);
  const address = streets.length
    ? `${streets.join(' & ')}, Hamilton, ON`
    : 'Hamilton, ON';

  const mappable = properties.DISPLAY_STATUS !== 'Do Not Display';

  return {
    id: String(properties.OBJECTID),
    code: properties.EVENT_NUM,
    category: parseCategory(properties.TYPE_OF_CALL),
    mappable,
    locationName: null,
    time: new Date(properties.DATE_TIME),
    location: {
      coordinates: mappable && geometry ? [geometry.coordinates[0], geometry.coordinates[1]] : null,
      address: mappable ? address : null,
    },
    units: properties.UNITS_DISPATCHED || null,
    stations: properties.STNS_INVOLVED || null,
  };
}

module.exports = { mapFeature, parseCategory };

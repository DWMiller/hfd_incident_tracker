/**
 * Parsed relevant tweet data into useful data/format describing the update
 */
const mongoose = require('../mongoose-connection');
const Incident = mongoose.model('Incident');

const HPD_CODE = /^F[0-9]+$/;
const EVENT_TYPE = /^[A-Z]+$/;
const LOCATION = /Loc:/;
const LOCATION_NAME = /^CN:/;

const cityCodes = {
  HAM: 'Hamilton',
  FL: 'Flamborough',
  SC: 'Stoney Creek',
  AN: 'Ancaster',
  DU: 'Dundas',
  GL: 'Glanbrook',
};

const parseFields = string => string.split('|').map(field => field.trim());

const parseLocationString = fields => fields.find(field => LOCATION.test(field));

const parseLocationBits = string => string.split(/[\/@]/).map(bit => bit.trim());

const parseAddressDetails = locationBits => {
  const address = locationBits.splice(locationBits.findIndex(field => LOCATION.test(field)), 1)[0];

  const details = address
    .replace('Loc:', '')
    .replace(/[0-9]+ Block /, '')
    .trim()
    .split(' ');

  return {
    cityCode: details.pop(),
    street: details.join(' '),
  };
};

const parseLocationName = locationBits => {
  let locationName = null;

  const locationNameIndex = locationBits.findIndex(field => LOCATION_NAME.test(field));

  if (locationNameIndex !== -1) {
    locationName = locationBits
      .splice(locationNameIndex, 1)[0]
      .replace('CN:', '')
      .trim();
  }

  return locationName;
};

exports.tweetParser = async tweet => {
  const fields = parseFields(tweet.text);
  const type = fields.find(field => EVENT_TYPE.test(field));

  const code = fields.find(field => HPD_CODE.test(field));

  if (fields.length === 1) {
    throw `Empty tweet, something failed prior to here`;
  }

  if (type !== 'NEW') {
    Incident.findOneAndUpdate({ code }, { $push: { tweets: tweet.id } });
    // TODO - Exit processing, push update through socket
    if (!code) {
      console.log(fields);
    }
    throw `Update tweet received - ${code}`;
  }

  const streets = [];
  let city, intersection;

  // const code = fields.find(field => HPD_CODE.test(field));
  const category = fields[2];

  const locationString = parseLocationString(fields);

  const locationBits = parseLocationBits(locationString);

  const locationName = parseLocationName(locationBits);

  /**
   * * Ideally, we would skip parsing the address if a location name is available.
   * * Exact address could be added during geocoding, however, lookup by name is not reliable.
   */

  const { cityCode, street } = parseAddressDetails(locationBits);

  city = cityCodes[cityCode] ? cityCodes[cityCode] : cityCode;

  streets.push(street);

  locationBits.forEach((bit, index) => {
    locationBits[index] = bit === 'DEAD END' || bit === 'PRIVATE RD' ? '' : bit;
  });

  streets.push(locationBits.shift());
  streets.push(locationBits.shift());

  const useStreet = streets.filter(street => !!street);

  useStreet.length = useStreet.length > 2 ? 2 : useStreet.length;

  intersection = `${useStreet.join(' at ')}, ${city}`;

  return {
    id: tweet.id,
    code,
    time: new Date(tweet.time),
    streets,
    category,
    type,
    intersection,
    city,
    locationName,
    tweets: [tweet.id],
    // created: new Date(tweet.time),
    // updated: new Date(tweet.time),
  };

  throw 'Uncaught error';
};

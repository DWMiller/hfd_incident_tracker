/**
 * Parsed relevant tweet data into useful data/format describing the update
 */

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
  GL: 'Glanbrook'
};

function parse(tweet) {
  const fields = tweet.text.split('|').map(field => field.trim());

  const event = {
    id: tweet.id,
    time: tweet.timestamp_ms
  };

  event.code = fields.find(field => HPD_CODE.test(field));
  event.type = fields.find(field => EVENT_TYPE.test(field));

  if (event.type === 'NEW') {
    event.category = fields[2];

    event.originalLocation = fields.find(field => LOCATION.test(field));

    const locationBits = event.originalLocation
      .split(/[\/@]/)
      .map(bit => bit.trim());

    const main = locationBits
      .shift()
      .replace('Loc:', '')
      .replace(/[0-9]+ Block /, '')
      .trim()
      .split(' ');

    const cityCode = main.pop();
    event.city = cityCodes[cityCode];

    if (typeof event.city === 'undefined') {
      console.log(`Unlisted city: ${cityCode}`);
    }

    event.streets = [];
    event.streets.push(main.join(' '));

    // console.log(event.location);

    const locationNameIndex = locationBits.findIndex(
      field => LOCATION_NAME.test(field)
    );

    if (locationNameIndex !== -1) {
      event.locationName = locationBits[locationNameIndex]
        .replace('CN:', '')
        .trim();
      locationBits.pop();
    }

    locationBits.forEach((bit, index) => {
      locationBits[index] = bit === 'DEAD END' || bit === 'PRIVATE RD'
        ? ''
        : bit;
    });

    // FIXME - Tweet might only have a CN, not streets

    event.streets.push(locationBits.shift());
    event.streets.push(locationBits.shift());

    const useStreet = event.streets.filter(street => !!street);

    useStreet.length = useStreet.length > 2 ? 2 : useStreet.length;

    event.intersection = `${useStreet.join(' at ')}, ${event.city}`;

    console.log(event.intersection);
    // event.intersection = `${event.streets.main} at ${useStreet}, ${event.city}`;
    // console.log(event.intersection);
  }

  return event;
}

module.exports = parse;

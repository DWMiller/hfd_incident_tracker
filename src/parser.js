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
    DU: 'Dundas'
}

module.exports = function(tweet) {

    let fields = tweet.text.split('|')
        .map((field) => field.trim());

    let event = {
        id: tweet.id,
        time: tweet.timestamp_ms,
    }

    event.code = fields.find((field) => HPD_CODE.test(field));
    event.type = fields.find((field) => EVENT_TYPE.test(field));

    if (event.type === 'NEW') {

        event.category = fields[2];

        event.originalLocation = fields.find((field) => LOCATION.test(field));

        let locationBits = event.originalLocation.split(/[\/@]/).map((bit) => bit.trim());

        let main = locationBits.shift().replace('Loc:', '').replace(/[0-9]+ Block /, '').trim().split(" ");
        event.city = cityCodes[main.pop()];

        event.streets = {
            main: main.join(" ")
        }

        // console.log(event.location);

        let locationNameIndex = locationBits.findIndex((field) => LOCATION_NAME.test(field));

        if (locationNameIndex !== -1) {
            event.locationName = locationBits[locationNameIndex]
                .replace('CN:', '').trim();
            locationBits.pop();
        }

        locationBits.forEach((bit, index) => {
            locationBits[index] = (bit == 'DEAD END' || bit == 'PRIVATE RD') ? '' : bit
        });

        event.streets.crossOne = locationBits.shift();
        event.streets.crossTwo = locationBits.shift();

        let useStreet = event.streets.crossOne;

        if (event.streets.crossOne == '') {
            useStreet = event.streets.crossTwo
        }

        event.intersection = event.streets.main + ' at ' + useStreet + ', ' + event.city;

        // console.log(event.intersection);
    }

    return event

}

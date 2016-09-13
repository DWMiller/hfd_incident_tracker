const HPD_CODE = /^F[0-9]+$/;
const EVENT_TYPE = /^[A-Z]+$/;
const LOCATION = /Loc:/;
const LOCATION_NAME = /^CN:/;

module.exports = function(tweet) {

    let fields = tweet.text.split('|')
        .map((field) => field.trim());

    let event = {}


    event.code = fields.find((field) => HPD_CODE.test(field));
    event.type = fields.find((field) => EVENT_TYPE.test(field));
    event.time = tweet.timestamp_ms;

    if (event.type === 'NEW') {
        event.originalLocation = fields.find((field) => LOCATION.test(field));

        let locationBits = event.originalLocation.split(/[\/@]/).map((bit) => bit.trim());

        event.streets = {
                main: locationBits.shift().replace('Loc:', '').replace(/[0-9]+ Block /, '').trim()
            }
            // console.log(event.location);

        let locationNameIndex = locationBits.findIndex((field) => LOCATION_NAME.test(field));

        if (locationNameIndex !== -1) {
            event.locationName = locationBits[locationNameIndex]
                .replace('CN:', '').trim();
            locationBits.pop();
        }

        event.streets.crossOne = locationBits.shift();
        event.streets.crossTwo = locationBits.shift();
        console.log(event);

    }

    return event

}

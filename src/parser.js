const HPD_CODE = /^F[0-9]+$/;
const EVENT_TYPE = /^[A-Z]+$/;
const LOCATION = /Loc:/;

module.exports = function(tweet) {

  let fields = tweet.text.split('|')
    .map((field) => field.trim());

  let parsed = {
    code: fields.find((field) => HPD_CODE.test(field)),
    type: fields.find((field) => EVENT_TYPE.test(field)),
    location: fields.find((field) => LOCATION.test(field)),
  }

  return parsed

}

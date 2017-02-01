// const geocoder = require('geocoder');

const geoCodeKey = 'AIzaSyBDX9TpI_4wnD1Q-JVmLjfhc9B-vPgwc0Y';
const googleMapsClient = require('@google/maps').createClient({
  key: geoCodeKey,
  Promise: Promise
});

function geoCode(tweet) {
  const useField = tweet.intersection;

  // if (tweet.locationName) {
  // CN field is not neccessarily correct or listed in google,
  // should attempt to resolve it but need to fall back to intersection on failure
  //     useField = tweet.locationName + ', ' + tweet.city
  // }

  return googleMapsClient
    .geocode({
      address: useField
    })
    .asPromise()
    .then(response => response.json.results[0])
    .catch(err => console.log(err));
}

module.exports = geoCode;

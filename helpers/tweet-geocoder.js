// const geocoder = require('geocoder');
require('dotenv').config({ path: __dirname + '/../variables.env' });

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GEOCODE_KEY,
  Promise: Promise,
});

async function geoCode(tweet) {
  // if (tweet.locationName) {
  // CN field is not neccessarily correct or listed in google,
  // should attempt to resolve it but need to fall back to intersection on failure
  //     useField = tweet.locationName + ', ' + tweet.city
  // }

  const response = await googleMapsClient
    .geocode({
      address: tweet.intersection + `, Ontario, Canada`,
    })
    .asPromise();

  const { geometry, formatted_address } = response.json.results[0];

  return Object.assign({}, tweet, {
    location: {
      coordinates: [geometry.location.lng, geometry.location.lat],
      address: formatted_address,
    },
  });
}

exports.default = geoCode;

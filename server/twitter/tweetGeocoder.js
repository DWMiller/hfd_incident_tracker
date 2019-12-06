// const geocoder = require('geocoder');
require('dotenv').config({ path: __dirname + '/../variables.env' });

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GEOCODE_KEY,
  Promise: Promise,
});

exports.tweetGeoCoder = async tweet => {
  if (tweet.locationName) {
    // console.log(tweet);
    // CN field is not neccessarily correct or listed in google,
    // should attempt to resolve it but need to fall back to intersection on failure
    //     useField = tweet.locationName + ', ' + tweet.city
  }

  const { geometry, formatted_address } = await googleMapsClient
    .geocode({
      address: tweet.intersection + `, Ontario, Canada`,
    })
    .asPromise()
    .then(r => r.json.results[0]);

  return {
    ...tweet,
    location: {
      coordinates: [geometry.location.lng, geometry.location.lat],
      address: formatted_address,
    },
  };
};

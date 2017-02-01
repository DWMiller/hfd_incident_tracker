const tweetGeoCoder = require('./tweet-geocoder.js');

const {
  parsed: parsedTweet,
  geoCoded: expectedGeoCodedTweet
} = require('./config/samples.js');

tweetGeoCoder(parsedTweet).then(({ geometry, formatted_address }) => {});

test('geocoding worked', () => {
  tweetGeoCoder(parsedTweet).then(({ geometry, formatted_address }) => {
    const geoCodedTweet = Object.assign({}, parsedTweet, {
      coordinates: geometry.location,
      formatted_address
    });

    expect(geoCodedTweet).toEqual(expectedGeoCodedTweet);
  });
});

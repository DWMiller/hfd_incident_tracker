const tweetGeoCoder = require('./tweet-geocoder.js');

// jest.unmock('./tweet-geocoder.js');

const {
  parsed: parsedTweet,
  geoCoded: expectedGeoCodedTweet
} = require('./config/samples.js');

test('geocoding worked', () => {
  tweetGeoCoder(parsedTweet)
    .then(geoCodedTweet => {
      expect(geoCodedTweet).toEqual(expectedGeoCodedTweet);
    })
    .catch(err => {});
});

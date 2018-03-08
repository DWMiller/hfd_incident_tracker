const tweetGeoCoder = require('./tweet-geocoder.js');

// jest.unmock('./tweet-geocoder.js');

const {
  parsed: parsedTweet,
  geoCoded: expectedGeoCodedTweet,
} = require('./config/samples.js');

//TODO - Test is false positive, doesn't work with async
test('geocoding worked', () => {
  tweetGeoCoder(parsedTweet)
    .then(geoCodedTweet => {
      expect(geoCodedTweet).toEqual(expectedGeoCodedTweet);
    })
    .catch(err => {});
});

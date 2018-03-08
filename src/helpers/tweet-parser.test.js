const tweetParser = require('./tweet-parser.js');

const {
  refined,
  parsed: expectedParsedTweet,
} = require('../config/samples.js');

test('parsed tweet in correct format', () => {
  const parsedTweet = tweetParser(refined);
  expect(parsedTweet).toEqual(expectedParsedTweet);
});

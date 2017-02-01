const tweetParser = require('./tweet-parser.js');

const { tweet: sampleTweet, parsed: expectedParsedTweet } = require(
  './config/samples.js'
);

test('parsed tweet in correct format', () => {
  const parsedTweet = tweetParser(sampleTweet);
  expect(parsedTweet).toEqual(expectedParsedTweet);
});

const tweetRefiner = require('./tweet-refiner.js');

const { tweet: sampleTweet, refined: expectedRefinedTweet } = require(
  './config/samples.js'
);

test('refined tweet in correct format', () => {
  const refinedTweet = tweetRefiner(sampleTweet);
  expect(refinedTweet).toEqual(expectedRefinedTweet);
});

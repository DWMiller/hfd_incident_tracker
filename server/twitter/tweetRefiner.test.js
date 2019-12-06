const { tweetRefiner } = require('./tweetRefiner');

const { tweet: sampleTweet, refined: expectedRefinedTweet } = require('../../samples.js');

test('refined tweet in correct format', async () => {
  const refinedTweet = await tweetRefiner(sampleTweet);
  expect(refinedTweet).toEqual(expectedRefinedTweet);
});

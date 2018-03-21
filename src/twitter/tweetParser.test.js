const { tweetParser } = require('./tweetParser');

const { refined, parsed: expectedParsedTweet } = require('../../samples.js');

test('parsed tweet in correct format', async () => {
  const parsedTweet = await tweetParser(refined);
  expect(parsedTweet).toEqual(expectedParsedTweet);
});

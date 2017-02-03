const tweetFetcher = require('./tweet-fetcher.js');

const sampleTweet = {
  id: 827022955351769100,
  text: 'NEW | F17004460 | MEDICAL | Loc: 1500 Block MAIN ST E HAM @ BARONS AV S/COPE ST /CN: ABINGTON COURT RETIREMENT... https://t.co/d6j8p68vXJ',
  timestamp_ms: '1486012612556'
};

const expectedTweet = {
  id: 827022955351769100,
  text: 'NEW | F17004460 | MEDICAL | Loc: 1500 Block MAIN ST E HAM @ BARONS AV S/COPE ST /CN: ABINGTON COURT RETIREMENT RESIDENCE | Units: E9 | 2/2/17 00:15',
  timestamp_ms: '1486012612556'
};

test('parsed tweet in correct format', () => {
  tweetFetcher.fetchFullTweet(sampleTweet).then(fullTweet => {
    expect(fullTweet).toEqual(expectedTweet);
  });
});

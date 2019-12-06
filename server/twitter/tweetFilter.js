exports.tweetFilter = async (tweet = {}) => {
  // All tweets have users, but pure tweet data coming in from our scripts may not
  if (tweet.user && tweet.user.id !== 611701456) {
    throw `IGNORED: Just a moron responding to a bot or retweet`;
    return false;
  }
  return tweet;
};

exports.tweetFilter = async (tweet = {}) => {
  if (tweet.user.id !== 611701456) {
    console.log(`IGNORED: Just a moron responding to a bot or retweet`);
    return false;
  }
  return tweet;
};

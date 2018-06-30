const getText = ({ text, extended_tweet }) => (extended_tweet ? extended_tweet.full_text : text);

/**
 * Returns new object containing only relevant fields of tweet
 */
exports.tweetRefiner = async tweet => {
  const { id_str: id, created_at: time } = tweet;
  return { id, text: getText(tweet), time };
};

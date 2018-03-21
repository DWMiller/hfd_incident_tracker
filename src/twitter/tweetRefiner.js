/**
 * Returns new object containing only relevant fields of tweet
 */
exports.tweetRefiner = async tweet => {
  const { id_str: id, text, created_at: time } = tweet;
  return { id, text, time };
};

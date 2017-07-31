/**
 * Returns new object containing only relevant fields of tweet
 */
function refine(tweet) {
  const { id, text, created_at: time } = tweet;
  return { id, text, time };
}

exports.default = refine;

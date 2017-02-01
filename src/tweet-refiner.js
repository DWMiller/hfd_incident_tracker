/**
  * Fields in a tweet we actually care about and want to preserve when stored
  */
const refinedFields = ['id', 'text', 'timestamp_ms'];

/**
 * Returns new object containing only relevant fields of tweet
 */
function refine(tweet) {
  const obj = {};

  refinedFields.forEach(field => {
    if (Object.hasOwnProperty.call(tweet, field)) {
      obj[field] = tweet[field];
    }
  });

  return obj;
}

module.exports = refine;

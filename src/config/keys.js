module.exports = {
  geocoder: process.env.GEOCODE_KEY,
  twitter: {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    token: process.env.TWITTER_TOKEN,
    token_secret: process.env.TWITTER_TOKEN_SECRET
  },
  mongo: {
    uri: process.env.MONGO_URI
  }
};

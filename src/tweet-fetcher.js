const request = require('request');
const cheerio = require('cheerio');

/**
 * Some tweets are incomplete and must be fetched via tweetymail
 * Link must be extracted from tweet, then page loaded and scraped
 */

function extractLink(text) {
  return text.match(/https:\/\/t\.co\/[0-9a-z]+/gi)[0];
}

function fetchFullTweet(tweet) {
  const link = extractLink(tweet.text);

  return new Promise(function(resolve, reject) {
    request(link, function(error, response, html) {
      // First we'll check to make sure no errors occurred when making the request

      if (!error) {
        // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

        const $ = cheerio.load(html);

        const text = $('#text').text().trim();

        const fullTweet = Object.assign({}, tweet, { text });

        resolve(fullTweet);
      }
    });
  });
}

module.exports = {
  fetchFullTweet
};

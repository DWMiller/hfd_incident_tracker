/**
 * ! Not currently in use
 * ! Looks like things were updated and we have full text now
 */

const request = require('request-promise-native');
const cheerio = require('cheerio');

/**
 * Some tweets are incomplete and must be fetched via tweetymail
 * Link must be extracted from tweet, then page loaded and scraped
 */

function extractLink(text) {
  const matches = text.match(/https:\/\/t\.co\/[0-9a-z]+/gi);
  return matches ? matches[0] : false;
}

exports.tweetFetcher = async tweet => {
  const uri = extractLink(tweet.text);

  if (!uri) {
    // If tweet does not have a link, return as is
    return tweet;
  }

  console.log('Partial tweet only, fetching...');

  const $ = await request({
    uri,
    transform: body => cheerio.load(body),
  });

  const text = $('#text')
    .text()
    .trim();

  console.log(`Fetched: ${text}`);
  return { ...tweet, text };
};

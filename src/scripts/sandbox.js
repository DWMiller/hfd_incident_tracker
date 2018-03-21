// const { tweetFetcher } = require('../twitter/tweetFetcher.js');

const request = require('request-promise-native');
const cheerio = require('cheerio');

var options = {
  uri: 'http://165.227.39.21/',
  transform: function(body) {
    return cheerio.load(body);
  },
};

request(options).then(function($) {
  console.log($('body').html());
});

const db = require('../src/nedb.js');
// var twitter = require('../src/twitter.js');

const DAY = 86400000;
const DAY_AGO = Date.now() - DAY;
//
// db.updates.find({
//   type: 'NEW',
//   $where() {
//     return this.time > DAY_AGO;
//   },
//         // time: {
//         //     $gte: DAY_AGO
//         // }
// }, (err, docs) => {
//   docs.map((doc) => {
//     console.log(doc.time);
//   });
// });

const Tweet = require('../src/models/tweet.js');
const Update = require('../src/models/update.js');
const tweetParser = require('../src/tweet-parser.js');
const twitter = require('../src/twitter.js');

db.updates.find(
  {
    $where() {
      return this.time > DAY_AGO;
    }
  },
  (err, docs) => {
    console.log(docs);
    docs.forEach(doc => {
      delete doc._id;
      Update.create(doc);
    });
  }
);

// Tweet.find({}, function(err, tweets) {
//   // console.log(tweets);
//   tweets.forEach(processTweet);
//   // resolve(updates);
// });

function processTweet(tweet) {
  twitter.processTweet(tweet, processedTweet => {
    Update.create(processedTweet);
  });
}

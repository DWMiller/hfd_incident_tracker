// var tweetParser = require('../src/parser.js');
const db = require('../src/database.js');
const twitter = require('../src/twitter.js');

db.tweets.find({}, (err, docs) => {
  docs.forEach((doc) => {
    doc = twitter.refine(doc);

    db.tweets.update({
      id: doc.id,
    }, doc);

        // console.log(JSON.stringify(doc, null, 4));
  });
});

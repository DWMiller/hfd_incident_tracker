const db = require('../src/database.js');

const tweetParser = require('../src/tweet-parser.js');

db.updates.remove({}, {
  multi: true
});

db.tweets.find({}, (err, docs) => {
  docs.forEach(doc => {
    if (/goo\.gl/.test(doc.text)) {
      // Can't yet handle content if externerally linked, skip it
      return;
    }

    const parsedDoc = tweetParser(doc);
    db.updates.insert(parsedDoc);
  });
});

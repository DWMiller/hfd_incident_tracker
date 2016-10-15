const db = require('../src/database.js');
const twitter = require('../src/twitter.js');

db.updates.remove({}, {
  multi: true,
});

db.tweets.find({}, (err, docs) => {
  docs.forEach((doc) => {
    if (/goo\.gl/.test(doc.text)) {
            // Can't yet handle content if externerally linked, skip it
      return;
    }

    const parsedDoc = twitter.parse(doc);
    db.updates.insert(parsedDoc);
  });
});

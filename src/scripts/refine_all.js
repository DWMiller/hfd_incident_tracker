const db = require('../src/database.js');
const tweetRefiner = require('../src/tweet-refiner.js');

db.tweets.find({}, (err, docs) => {
  docs.forEach(doc => {
    doc = tweetRefiner(doc);

    db.tweets.update(
      {
        id: doc.id
      },
      doc
    );
    // console.log(JSON.stringify(doc, null, 4));
  });
});

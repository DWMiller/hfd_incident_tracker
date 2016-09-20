var db = require('../src/database.js');
var twitter = require('../src/twitter.js');

db.updates.remove({}, {
    multi: true
});

db.tweets.find({}, function(err, docs) {
    docs.forEach((doc) => {

        if (/goo\.gl/.test(doc.text)) {
            // Can't yet handle content if externerally linked, skip it
            return;
        }

        doc = twitter.parse(doc);
        db.updates.insert(doc);
    })
});

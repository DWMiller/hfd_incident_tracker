var db = require('../src/database.js');
var twitter = require('../src/twitter.js');

db.updates.remove({}, {
    multi: true
});

db.tweets.find({}, function(err, docs) {
    docs.forEach((doc) => {
        doc = twitter.parse(doc);
        db.updates.insert(doc);
    })
});

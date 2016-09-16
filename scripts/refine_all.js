// var tweetParser = require('../src/parser.js');
var db = require('../src/database.js');
var twitter = require('../src/twitter.js');

db.tweets.find({}, function(err, docs) {
    docs.forEach((doc) => {

        doc = twitter.refine(doc);

        db.tweets.update({
            id: doc.id
        }, doc);

        // console.log(JSON.stringify(doc, null, 4));
    })

});

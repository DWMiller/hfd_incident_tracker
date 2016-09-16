var db = require('../src/database.js');
var twitter = require('../src/twitter.js');

var queue;

db.updates.find({
    formatted_address: {
        $exists: false
    },
    type: 'NEW'
}, function(err, docs) {
    queue = docs;
    geocode();
});

function geocode() {

    let tweet = queue.shift();

    twitter.geocode(tweet, (tweet) => {
        console.log('Geocode complete, ' + queue.length + ' remaining');

        db.updates.update({
            id: tweet.id
        }, tweet);

        if (queue.length) {
            setTimeout(geocode, 750);
        }
    });

}



function save(tweet) {
    db.updates.insert(tweet);
}

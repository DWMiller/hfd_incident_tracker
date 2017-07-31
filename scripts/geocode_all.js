const db = require('../src/database.js');
const twitter = require('../src/twitter.js');

let queue;

db.updates.find(
  {
    formatted_address: {
      $exists: false,
    },
    type: 'NEW',
  },
  (err, docs) => {
    queue = docs;
    geocode();
  }
);

function geocode() {
  const tweet = queue.shift();

  twitter.geocode(tweet, tweet => {
    if (tweet) {
      console.log(`Geocode complete, ${queue.length} remaining`);

      db.updates.update(
        {
          id: tweet.id,
        },
        tweet
      );
    }

    if (queue.length) {
      setTimeout(geocode, 750);
    }
  });
}

// function save(tweet) {
//   db.updates.insert(tweet);
// }

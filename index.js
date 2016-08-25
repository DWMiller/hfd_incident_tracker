var sample = require('./src/sample.js');
var tweetParser = require('./src/parser.js');

// Type 3: Persistent datastore with automatic loading
var Datastore = require('nedb'),
  db = new Datastore({
    filename: 'database',
    autoload: true
  });
// You can issue commands right away

db.find({}, function(err, docs) {
  console.log(docs.pop());
  // count equals to 4
});

let data = {

}

function handleTweet(tweet) {
  let parsed = tweetParser(tweet);
  // console.log('tweet received', tweet)

  if (!data.hasOwnProperty(parsed.code)) {
    data[parsed.code] = [];
  }

  data[parsed.code].push(parsed);

  // db.insert(data, function(err, newDoc) { // Callback is optional
  //   console.log(newDoc);
  //   // newDoc is the newly inserted document, including its _id
  //   // newDoc has no key called notToBeSaved since its value was undefined
  // });

  // console.log('Data: ', JSON.stringify(data, null, 2));

}

var Twitter = require('node-tweet-stream'),
  t = new Twitter({
    consumer_key: '7IbK7hgaJ08LYSnI3ZqZm0T64',
    consumer_secret: 'FgSu5C0gIDyTKEPgJ8PtioxSUsXLhmiW6EJRd3JB5uSQUsBLXd',
    token: '717764605-fXFnaMzIVzRtYsXPLCSH1rP2KV4P3wk5UOam5fZE',
    token_secret: 'Gy0OTh4HyP0y3spZFawkqOZsuZnRus3CTyV4YvUaZuaqt'
  })

t.on('tweet', handleTweet)

t.on('error', function(err) {
  console.log('Oh no', err);
})

handleTweet(sample)
  // t.follow('611701456');

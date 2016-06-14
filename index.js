
var Twitter = require('node-tweet-stream')
  , t = new Twitter({
    consumer_key: '7IbK7hgaJ08LYSnI3ZqZm0T64',
    consumer_secret: 'FgSu5C0gIDyTKEPgJ8PtioxSUsXLhmiW6EJRd3JB5uSQUsBLXd',
    token: '717764605-fXFnaMzIVzRtYsXPLCSH1rP2KV4P3wk5UOam5fZE',
    token_secret: 'Gy0OTh4HyP0y3spZFawkqOZsuZnRus3CTyV4YvUaZuaqt'
  })

t.on('tweet', function (tweet) {
  console.log('tweet received', tweet)
  console.log('tweet received', tweet.text.split('|'));
})

t.on('error', function (err) {
  console.log('Oh no',err);
})

t.follow('611701456');

// t.track('nodejs')


  // console.log(JSON.stringify(twitter,null, 2));

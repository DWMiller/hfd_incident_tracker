// var sample = require('./src/sample.js');
var tweetParser = require('./src/parser.js');

var Datastore = require('nedb');

var db = new Datastore({
    filename: 'database',
    autoload: true,
    timestampData: true
});

db.ensureIndex({
    fieldName: 'code'
}, function(err) {});

var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    db.find({}, function(err, docs) {
        // console.log(JSON.stringify(docs, null, 4));
        res.json(docs);
    });

});

router.get('/:code', function(req, res) {
    db.find({
        code: req.params.code
    }, function(err, docs) {
        // console.log(JSON.stringify(docs, null, 4));
        res.json(docs);
    });

});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.get('*', function(req, res) {
    res.sendFile('public/index.html', {
        root: __dirname
    });
});
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);




// let data = {
//
// }

function handleTweet(tweet) {
    let parsed = tweetParser(tweet);
    // console.log('tweet received', tweet)

    // if (!data.hasOwnProperty(parsed.code)) {
    //     data[parsed.code] = [];
    // }

    // data[parsed.code].push(parsed);

    // console.log(data);
    // console.log(parsed);

    db.insert(parsed, function(err, newDoc) { // Callback is optional
        // console.log(newDoc);
        //   // newDoc is the newly inserted document, including its _id
        //   // newDoc has no key called notToBeSaved since its value was undefined

        db.find({
            code: parsed.code
        }, function(err, docs) {
            console.log(JSON.stringify(docs, null, 4));
        });

    });

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

// handleTweet(sample)
t.follow('611701456');

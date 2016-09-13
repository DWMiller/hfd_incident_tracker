var twitter = require('./src/twitter.js');
var tweetParser = require('./src/parser.js');

var db = require('./src/database.js');

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

function handleTweet(tweet) {
    // Can't yet handle content if externerally linked, skip it
    if (/goo\.gl/.test(tweet.text)) {
        return;
    }

    let parsed = tweetParser(tweet);

    db.insert(parsed, function(err, newDoc) {
        db.find({
            code: parsed.code
        }, function(err, docs) {
            console.log(JSON.stringify(docs, null, 4));
        });

    });

}

twitter.on('tweet', handleTweet)

twitter.on('error', function(err) {
    console.log('Oh no', err);
})

twitter.follow('611701456');

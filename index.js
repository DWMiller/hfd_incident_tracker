var twitter = require('./src/twitter.js');
var db = require('./src/database.js');

var express = require('express'); // call express
var app = express(); // define our app using express

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(80); //process.env.PORT || 8081);

app.use(express.static(__dirname + '/public'));

twitter.connection.on('tweet', (tweet) => {
    twitter.handleTweet(tweet, (tweet) => {
        io.emit('event', tweet);
    });
})

twitter.connection.on('error', function(err) {
    console.log('Oh no', err);
})

twitter.connection.follow('611701456');

const DAY = 86400000;
const DAY_AGO = (Date.now() - DAY);
//Create web sockets connection.
io.sockets.on('connection', function(socket) {

    socket.on("all_events", function() {

        db.updates.find({
            type: "NEW",
            $where: function() {
                    return this.time > DAY_AGO;
                }
                // time: {
                //     $gte: DAY_AGO
                // }
        }, function(err, docs) {
            // docs.map((doc) => {
            //     console.log(doc.time);
            // })
            socket.emit('events', docs);
            // socket.broadcast.emit("twitter-stream", docs)
        });

    });

    // Emits signal to the client telling them that the
    // they are connected and can start receiving Tweets
    socket.emit("connected");

});





// ROUTES FOR OUR API
// =============================================================================
// var router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
// router.get('/', function(req, res) {
//     db.updates.find({}, function(err, docs) {
//         res.json(docs);
//     });
//
// });

// router.get('/:code', function(req, res) {
//     db.updates.find({
//         code: req.params.code
//     }, function(err, docs) {
//         // console.log(JSON.stringify(docs, null, 4));
//         res.json(docs);
//     });
//
// });

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
// app.use('/api', router);

// app.get('*', function(req, res) {
//     res.sendFile('public/index.html', {
//         root: __dirname
//     });
// });
// START THE SERVER
// =============================================================================

// app.listen(port);
// console.log('Magic happens on port ' + port);

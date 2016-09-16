var twitter = require('./src/twitter.js');
var db = require('./src/database.js');

var express = require('express'); // call express
var app = express(); // define our app using express
// var bodyParser = require('body-parser');

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// const flow = require('lodash/fp/flow');

// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.json());

// var port = process.env.PORT || 8081; // set our port

server.listen(process.env.PORT || 8081);

app.use(express.static(__dirname + '/public'));

twitter.connection.on('tweet', (tweet) => {
    twitter.handleTweet(tweet);
})

twitter.connection.on('error', function(err) {
    console.log('Oh no', err);
})

twitter.connection.follow('611701456');

//Create web sockets connection.
io.sockets.on('connection', function(socket) {
    console.log('connected');

    socket.on("start tweets", function() {


        db.updates.find({}, function(err, docs) {

            socket.broadcast.emit("twitter-stream", docs)
            socket.emit('twitter-stream', docs)

            // res.json(docs);
        });

        // var data = {
        //         test: 'test'
        //     }
        // if (stream === null) {
        //     //Connect to twitter stream passing in filter for entire world.
        //     twit.stream('statuses/filter', {
        //         'locations': '-180,-90,180,90'
        //     }, function(s) {
        //         stream = s;
        //         stream.on('data', function(data) {
        //             // Does the JSON result have coordinates
        //             if (data.coordinates) {
        //                 if (data.coordinates !== null) {
        //                     //If so then build up some nice json and send out to web sockets
        //                     var outputPoint = {
        //                         "lat": data.coordinates.coordinates[0],
        //                         "lng": data.coordinates.coordinates[1]
        //                     };
        //
        // socket.broadcast.emit("twitter-stream", data);
        //
        //                     //Send out to web sockets channel.
        // socket.emit('twitter-stream', data);
        //                 }
        //             }
        //         });
        //     });
        // }
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

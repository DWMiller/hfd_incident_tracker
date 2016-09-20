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
        }, function(err, docs) {
            socket.emit('events', docs);
        });

    });

    // Emits signal to the client telling them that the
    // they are connected and can start receiving data
    socket.emit("connected");

});

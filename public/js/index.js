var map;
var geocoder;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 43.254401,
            lng: -79.863552
        },
        zoom: 10
    });

    geocoder = new google.maps.Geocoder();

    startSocket();
}

function startSocket() {

    if (io !== undefined) {
        // Storage for WebSocket connections
        var socket = io.connect('http://localhost:8081/');

        // This listens on the "twitter-steam" channel and data is
        // received everytime a new tweet is receieved.
        socket.on('twitter-stream', function(data) {

            // console.log(data);

            data.forEach((update) => {

                geocoder.geocode({
                    'address': update.intersection
                }, function(results, status) {
                    console.log(results);
                    if (status === 'OK') {
                        var marker = new google.maps.Marker({
                            position: results[0].geometry.location,
                            map: map,
                        });
                    }
                    // if (status === 'OK') {
                    //   resultsMap.setCenter(results[0].geometry.location);
                    //   var marker = new google.maps.Marker({
                    //     map: resultsMap,
                    //     position: results[0].geometry.location
                    //   });
                    // } else {
                    //   alert('Geocode was not successful for the following reason: ' + status);
                    // }
                });



            })




        });

        // Listens for a success response from the server to
        // say the connection was successful.
        socket.on("connected", function(r) {
            //Now that we are connected to the server let's tell
            //the server we are ready to start receiving tweets.
            socket.emit("start tweets");
        });
    }

}

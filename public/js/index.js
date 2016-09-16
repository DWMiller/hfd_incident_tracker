var map;
var geocoder;

var activeMarker = null;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 43.254401,
            lng: -79.863552
        },
        zoom: 10
    });

    google.maps.event.addListener(map, "click", function(event) {
        if (activeMarker) {
            activeMarker.InfoWindow.close();
            activeMarker = null;
        }

    });

    startSocket();
}

function startSocket() {

    if (io !== undefined) {

        var socket = io.connect('http://localhost:8081/');

        socket.on('events', function(data) {
            data.forEach(addToMap);
        });

        socket.on('event', (update) => {
            addToMap(update);
        });

        // Listens for a success response from the server to
        // say the connection was successful.
        socket.on("connected", function(r) {

            //Now that we are connected to the server let's tell
            //the server we are ready to start receiving tweets.
            socket.emit("all_events");
        });
    }

}

function addToMap(update) {
    console.log(update);

    var marker = new google.maps.Marker({
        position: update.coordinates,
        title: update.formatted_address,
        map: map,
    });

    marker.addListener('click', function() {

        let infoWindowContent = '<div>' +
            '<h1>' + update.category + '</h1>' +
            '<p>' + update.formatted_address + '</p>' +
            '</div>'

        marker.InfoWindow = new google.maps.InfoWindow({
            content: infoWindowContent
        })

        if (activeMarker) {
            activeMarker.InfoWindow.close();
        }

        activeMarker = marker;
        marker.InfoWindow.open(map, marker);
    });

}

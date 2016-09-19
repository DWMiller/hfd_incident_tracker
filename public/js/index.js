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
        // var socket = io.connect('http://localhost:8081/');
        var socket = io.connect(window.location.href);

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
    // console.log(update.category);

    var iconFile = typeIcons[update.category];

    if (typeof iconFile === 'undefined') {
        iconFile = typeIcons['UNKNOWN'];
        console.log('Unknown event type: ' + update.category);
    }

    var icon = {
        url: 'img/' + iconFile.file,
        scaledSize: new google.maps.Size(iconFile.width, iconFile.height), // scaled size
    };

    var marker = new google.maps.Marker({
        position: update.coordinates,
        title: update.formatted_address,
        map: map,
        icon: icon
    });

    update.displayDate = moment().millisecond(update.time).format("h:mm a");

    marker.addListener('click', function() {

        let infoWindowContent = '<div>';

        if (update.locationName) {
            infoWindowContent += '<h1>' + update.locationName + '</h1>';
        }

        infoWindowContent += '<h2>' + update.code + ' - ' + update.category + '</h2>';

        infoWindowContent += '<p>' + update.formatted_address + '</p>';
        infoWindowContent += '<p>' + update.displayDate + '</p>' +
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

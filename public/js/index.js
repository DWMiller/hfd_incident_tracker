var map;
var geocoder;

var activeMarker = null;

var typeIcons = {
    'MEDICAL': 'medical.png',
    'SMOKE DETECTOR': 'fire2.png',
    'SMOKE': 'fire2.png',
    'VEHICLE FIRE': 'car-fire.png',
    'CO DETECTOR': 'alarm.png',
    'BURN COMPLAINT': 'medical.png',
    'ALARM CONDITIONS': 'alarm.png',
    // 'NATURAL GAS': 'alarm.png',
    'VEHICLE ACC': 'accident.jpg',
    'STRUCTURE FIRE': 'fire2.png',
    // 'MULTIPLE ALARM': 'alarm.png',
    'GRASS FIRE': 'fire2.png',
    'ELECTRICAL PROBLEM': 'electrical.png',
    // 'RUBBISH FIRE'
    //  'APPLIANCE FIRE'
    // 'FIRE OUT'
    //  'FD ASSISTANCE'
    // 'PROPANE LEAK':
    // 'ODOURS' : ''
    'UNKNOWN': 'question.png'
}

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
        url: 'img/' + iconFile,
        scaledSize: new google.maps.Size(35, 35), // scaled size
        // origin: new google.maps.Point(0,0), // origin
        // anchor: new google.maps.Point(0, 0) // anchor
    };

    var marker = new google.maps.Marker({
        position: update.coordinates,
        title: update.formatted_address,
        map: map,
        icon: icon
    });

    marker.addListener('click', function() {

        let infoWindowContent = '<div>';

        if (update.locationName) {
            infoWindowContent += '<h1>' + update.locationName + '</h1>';
        }

        infoWindowContent += '<h2>' + update.code + ' - ' + update.category + '</h2>';

        infoWindowContent += '<p>' + update.formatted_address + '</p>';
        infoWindowContent += '<p>' + update.time + '</p>' +
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

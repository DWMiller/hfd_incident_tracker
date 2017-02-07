import GoogleMap from 'google-map-react';
import eventMarkerCreate from './event-marker';

export default React => {
  const Marker = eventMarkerCreate(React);

  function generateMarkers(alerts) {
    return alerts.map(alert => (
      <Marker key={alert.id} alert={alert} {...alert.coordinates} />
    ));
  }

  const Map = ({ alerts }) => {
    const center = { lat: 43.254401, lng: -79.863552 };

    const Markers = generateMarkers(alerts);

    const apiKey = 'AIzaSyBDX9TpI_4wnD1Q-JVmLjfhc9B-vPgwc0Y';

    return (
      <div className="map-container" width>
        <GoogleMap
          defaultCenter={center}
          defaultZoom={10}
          bootstrapURLKeys={{ key: apiKey }}
        >
          {Markers}
        </GoogleMap>
      </div>
    );
  };

  Map.propTypes = {
    alerts: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        coordinates: React.PropTypes.object.isRequired,
        code: React.PropTypes.string.isRequired
      })
    )
  };

  return Map;
};
// google.maps.event.addListener(map, 'click', () => {
//   if (activeMarker) {
//     activeMarker.InfoWindow.close();
//     activeMarker = null;
//   }
// });
// function addToMap(update) {
//     // console.log(update.category);
//
//   let iconFile = typeIcons[update.category];
//
//   if (typeof iconFile === 'undefined') {
//     iconFile = typeIcons.UNKNOWN;
//     console.log(`Unknown event type: ${update.category}`);
//   }
//
//   const icon = {
//     url: `img/${iconFile.file}`,
//     scaledSize: new google.maps.Size(iconFile.width, iconFile.height), // scaled size
//   };
//
//   const marker = new google.maps.Marker({
//     position: update.coordinates,
//     title: update.formatted_address,
//     map,
//     icon,
//   });
//
//   console.log(update.time);
//   update.displayDate = moment(update.time, 'x').format('dddd h:mm a');
//   console.log(update.displayDate);
//
//   marker.addListener('click', () => {
//     let infoWindowContent = '<div>';
//
//     if (update.locationName) {
//       infoWindowContent += `<h1>${update.locationName}</h1>`;
//     }
//
//     infoWindowContent += `<h2>${update.code} - ${update.category}</h2>`;
//
//     infoWindowContent += `<p>${update.formatted_address}</p>`;
//     infoWindowContent += `<p>${update.displayDate}</p>` +
//             '</div>';
//
//     marker.InfoWindow = new google.maps.InfoWindow({
//       content: infoWindowContent,
//     });
//
//     if (activeMarker) {
//       activeMarker.InfoWindow.close();
//     }
//
//     activeMarker = marker;
//     marker.InfoWindow.open(map, marker);
//   });
// }

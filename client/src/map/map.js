import GoogleMap from 'google-map-react';
import eventMarkerCreate from '../event_marker/marker';

export default (React) => {
  const Marker = eventMarkerCreate(React);

  function generateMarkers(alerts) {
    alerts.map(alert => (
      <Marker key={alert._id} alert={alert} {...alert.coordinates} />
    ));
  }

  const Map = ({ alerts }) => {
    const center = { lat: 43.254401, lng: -79.863552 };

    const Markers = generateMarkers(alerts);

    return (
      <GoogleMap defaultCenter={center} defaultZoom={10}>
        {Markers}
      </GoogleMap>
    );
  };

  Map.propTypes = { alerts: React.PropTypes.arrayOf(React.PropTypes.object) };

  return Map;
};
// apiKey={'AIzaSyBDX9TpI_4wnD1Q-JVmLjfhc9B-vPgwc0Y'}

import GoogleMap from 'google-map-react';
import eventMarkerCreate from '../event_marker/marker';

export default (React) => {
  const map = ({ alerts }) => {
    const Marker = eventMarkerCreate(React);

    const center = { lat: 43.254401, lng: -79.863552 };

    const Markers = alerts.map(alert =>
      <Marker key={alert._id} alert={alert} {...alert.coordinates} />);

    return (
      <GoogleMap
        defaultCenter={center}
        defaultZoom={10}
      >
        {Markers}
      </GoogleMap>
    );
  };

  map.propTypes = {
    alerts: React.PropTypes.arrayOf(React.PropTypes.shape({
      code: React.PropTypes.string.isRequired,
    })),
  };

  return map;
};


  // apiKey={'AIzaSyBDX9TpI_4wnD1Q-JVmLjfhc9B-vPgwc0Y'}

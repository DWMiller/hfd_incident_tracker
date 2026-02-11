import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Overlay } from 'pigeon-maps';

import { incidentDefinitions } from '../config/incident-definitions';
import Map from '../components/Map';
import { fetchIncident } from '../store/modules/incidentLoaded';

const Container = styled.div`
  padding: 1rem;
  max-width: 500px;
  margin: auto;
`;

const Header = styled.div`
  text-transform: capitalize;
`;

const MapContainerWrapper = styled.div`
  height: 240px;
  width: 100%;
  max-width: 500px;
`;

const Detail = styled.p`
  margin: 0.5rem 0;
`;

function ScreenIncident() {
  const dispatch = useDispatch();
  const { code } = useParams();

  const incident = useSelector(state => state.incidentLoaded);

  React.useEffect(() => {
    dispatch(fetchIncident(code));
  }, [code, dispatch]);

  if (!incident) {
    return null;
  }

  const [streetAddress] = (incident.location.address || 'Hamilton, ON').split(',');
  const locationText = incident.locationName ? incident.locationName.toLowerCase() : streetAddress;

  const { text: typeText } = incidentDefinitions[incident.category]
    ? incidentDefinitions[incident.category]
    : incidentDefinitions['UNKNOWN'];

  const hasPosition = !!incident.position;

  return (
    <Container>
      <Header>
        <h1>
          <span>{typeText}</span>
          <span> @ {locationText}</span>
        </h1>
        <Link to="/app">View Recent Incidents</Link>
      </Header>

      {hasPosition && (
        <MapContainerWrapper>
          <Map
            lat={incident.position.lat}
            lng={incident.position.lng}
            zoom={13}
            mouseEvents={false}
            touchEvents={false}
          >
            <Overlay anchor={[incident.position.lat, incident.position.lng]}>
              <img
                src={incident.icon.file}
                width={incident.icon.width}
                height={incident.icon.height}
                alt=""
              />
            </Overlay>
          </Map>
        </MapContainerWrapper>
      )}

      {incident.units && <Detail><strong>Units:</strong> {incident.units}</Detail>}
      {incident.stations && <Detail><strong>Stations:</strong> {incident.stations}</Detail>}
    </Container>
  );
}

export default ScreenIncident;

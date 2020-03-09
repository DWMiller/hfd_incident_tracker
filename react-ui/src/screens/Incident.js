import PigeonOverlay from 'pigeon-overlay';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { incidentDefinitions } from '../config/incident-definitions';

// import { getIncident } from '../store/actions/incidents';
import Map from '../components/Map';
import { fetchIncident } from 'store/modules/incidentLoaded';

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
  width: 240px;
  width: 100%;
  max-width: 500px;
`;

const TweetSection = styled.div`
  grid-area: tweets;
`;

const Tweets = ({ tweets = [] }) => tweets.map(id => <TwitterTweetEmbed key={id} tweetId={id} />);

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

  const [streetAddress] = incident.location.address.split(',');
  const locationText = incident.locationName ? incident.locationName.toLowerCase() : streetAddress;

  const { text: typeText } = incidentDefinitions[incident.category]
    ? incidentDefinitions[incident.category]
    : incidentDefinitions['UNKNOWN'];

  const { lat, lng } = incident.position;
  const { height, width, file: url } = incident.icon;

  return (
    <Container>
      <Header>
        <h1>
          <span>{typeText}</span>
          <span> @ {locationText}</span>
        </h1>
        <Link to="/">View Recent Incidents</Link>
      </Header>

      <MapContainerWrapper>
        <Map lat={lat} lng={lng} zoom={13} mouseEvents={false} touchEvents={false}>
          <PigeonOverlay anchor={[lat, lng]}>
            <img src={url} width={width} height={height} alt="" />
          </PigeonOverlay>
        </Map>
      </MapContainerWrapper>
      <TweetSection>
        <Tweets tweets={incident.tweets} />
      </TweetSection>
    </Container>
  );
}

export default ScreenIncident;

import PigeonOverlay from 'pigeon-overlay';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getIncident } from '../store/actions/incidents';
import Map from '../components/Map';

const Container = styled.div`
  padding: 1rem;

  @media screen and (min-width: 1200px) {
    display: grid;

    grid-template-areas:
      'head head'
      'map tweets';

    grid-template-columns: 500px auto;
    grid-column-gap: 1rem;
  }
`;

const Header = styled.div`
  grid-area: head;
`;

const MapContainerWrapper = styled.div`
  grid-area: map;
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
    dispatch(getIncident(code));
  }, [code, dispatch]);

  if (!incident) {
    return null;
  }

  const { lat, lng } = incident.position;
  const { height, width, file: url } = incident.icon;

  return (
    <Container>
      <Header>
        <h1>Page Under Construction</h1>
        <Link to="/">Back to Map</Link>
      </Header>

      <MapContainerWrapper>
        <Map lat={lat} lng={lng} zoom={13}>
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

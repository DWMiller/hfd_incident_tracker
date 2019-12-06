import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PigeonOverlay from 'pigeon-overlay';
import { TwitterTweetEmbed } from 'react-twitter-embed';

import { getIncident } from '../redux/actions/incidents';
import Map from '../components/Map';
import { Loading } from './incident/Loading';

const PageContainer = styled.div`
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

export class ScreenIncident extends React.Component {
  componentDidMount() {
    this.props.getIncident(this.props.code);
  }

  render() {
    const { lat, lng } = this.props.incident.position;
    const { height, width, file: url } = this.props.incident.icon;

    return (
      <PageContainer>
        <Header>
          <h1>Page Under Construction</h1>
          <Link to="/">Back to Map</Link>
        </Header>

        {this.props.incident.id ? (
          <React.Fragment>
            <MapContainerWrapper>
              <Map lat={lat} lng={lng} zoom={13}>
                <PigeonOverlay anchor={[lat, lng]}>
                  <img src={url} width={width} height={height} alt="" />
                </PigeonOverlay>
              </Map>
            </MapContainerWrapper>
            <TweetSection>
              <Tweets tweets={this.props.incident.tweets} />
            </TweetSection>
          </React.Fragment>
        ) : (
          <Loading />
        )}
      </PageContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    incident: state.loadedIncident,
  };
};

export default connect(mapStateToProps, { getIncident })(ScreenIncident);

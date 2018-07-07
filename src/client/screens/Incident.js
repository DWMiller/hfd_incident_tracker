import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Link } from 'react-router-dom';

import { Loading } from './incident/Loading';

import { getIncident } from 'client/redux/actions/incidents';

import ScreenIncidentMap from './incident/Map';

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
  width: 100%;
  max-width: 500px;
`;

const TweetSection = styled.div`
  grid-area: tweets;
`;

const Tweets = ({ tweets = [] }) => (
  <React.Fragment>{tweets.map(id => <TwitterTweetEmbed key={id} tweetId={id} />)}</React.Fragment>
);

export class ScreenIncident extends Component {
  componentDidMount() {
    this.props.getIncident(this.props.code);
  }

  render() {
    return (
      <PageContainer>
        <Header>
          <h1>Page Under Construction</h1>
          <Link to="/">Back to Map</Link>
        </Header>

        {this.props.incident.id ? (
          <React.Fragment>
            <MapContainerWrapper>
              <ScreenIncidentMap incident={this.props.incident} width="100%" height="240px" />
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getIncident }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenIncident);

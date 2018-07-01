import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { TwitterTweetEmbed } from 'react-twitter-embed';

import * as actionCreators from '../../redux/actionCreators';

import ScreenIncidentMap from './Map';

const MapContainerWrapper = styled.div`
  width: 500px;
`;

export class ScreenIncident extends Component {
  componentDidMount() {
    this.props.fetchIncidentDetails(this.props.code);
  }

  render() {
    // console.log(this.props.incident);

    if (!this.props.incident.tweets) {
      return <div />;
    }
    return (
      <div>
        <MapContainerWrapper>
          <ScreenIncidentMap incident={this.props.incident} width="240px" height="240px" />
        </MapContainerWrapper>
        {this.props.incident.tweets.map(id => <TwitterTweetEmbed key={id} tweetId={id} />)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    incident: state.loadedIncident,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenIncident);

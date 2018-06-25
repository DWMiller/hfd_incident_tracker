import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { TwitterTweetEmbed } from 'react-twitter-embed';

import * as actionCreators from '../../redux/actionCreators';

export class ScreenIncident extends Component {
  componentDidMount() {
    this.props.fetchIncidentDetails(this.props.code);
  }

  render() {
    console.log(this.props.incident);
    return (
      <div>
        <TwitterTweetEmbed tweetId={this.props.incident.id} />
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

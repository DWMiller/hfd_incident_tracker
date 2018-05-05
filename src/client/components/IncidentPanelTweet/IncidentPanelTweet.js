import React, { PureComponent } from 'react';

import { TwitterTweetEmbed } from 'react-twitter-embed';

import { incidentType } from '../../types';
import './IncidentPanelTweet.css';

class IncidentPanelTweet extends PureComponent {
  render() {
    const { incident } = this.props;

    return (
      <div className="incident-panel-item">
        <TwitterTweetEmbed tweetId={incident.id} />
      </div>
    );
  }

  static propTypes = {
    incident: incidentType,
  };
}

export default IncidentPanelTweet;

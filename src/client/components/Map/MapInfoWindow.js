import React, { PureComponent } from 'react';

import moment from 'moment';

import { InfoWindow } from 'react-google-maps';

import { incidentDefinitions } from '../../config/incident-definitions';
import { incidentType, iconType } from '../../types';

import './MapInfoWindow.css';

export class MapInfoWindow extends PureComponent {
  static propTypes = {
    incident: incidentType.isRequired,
    icon: iconType.isRequired,
  };

  render() {
    const { icon, incident } = this.props;

    const type = incidentDefinitions[incident.category]
      ? incidentDefinitions[incident.category]
      : incidentDefinitions['UNKNOWN'];

    const date = moment(incident.created).format('MMMM Do h:mm a');
    return (
      <InfoWindow onCloseClick={this.props.onCloseClick}>
        <div className="incident-info-window">
          <img
            className="icon"
            width={icon.width}
            height={icon.height}
            src={icon.file}
            alt={type.text}
          />
          {incident.locationName && <span className="location">{incident.locationName}</span>}
          <span className="category">{type.text}</span>
          <span className="address">{incident.location.address}</span>

          <span className="link">
            <a
              onClick={this.twitterLinkClick}
              href={'https://twitter.com/HFD_Incidents/status/' + incident.id}
            >
              View on Twitter
            </a>
          </span>

          <span className="time">{date}</span>
        </div>
      </InfoWindow>
    );
  }
}

export default MapInfoWindow;

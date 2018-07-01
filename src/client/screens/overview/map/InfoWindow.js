import React, { PureComponent } from 'react';

import moment from 'moment';

import { InfoWindow } from 'react-google-maps';

import { incidentDefinitions } from 'client/config/incident-definitions';
import { incidentType, iconType } from 'client/types';

import {
  InfoWindowWrapper,
  Location,
  Category,
  Address,
  Time,
  TwitterLink,
  IncidentLink,
} from './infoWindow/components';

export class MapInfoWindow extends PureComponent {
  render() {
    const { icon, incident } = this.props;

    const type = incidentDefinitions[incident.category]
      ? incidentDefinitions[incident.category]
      : incidentDefinitions['UNKNOWN'];

    const date = moment(incident.created).format('MMMM Do h:mm a');
    return (
      <InfoWindow onCloseClick={this.props.onCloseClick}>
        <InfoWindowWrapper>
          <IncidentLink incident={incident} />

          <img width={icon.width} height={icon.height} src={icon.file} alt={type.text} />
          {incident.locationName && <Location>{incident.locationName}</Location>}
          <Category>{type.text}</Category>
          <Address>{incident.location.address}</Address>

          <TwitterLink incident={incident} />

          <Time>{date}</Time>
        </InfoWindowWrapper>
      </InfoWindow>
    );
  }
}

MapInfoWindow.propTypes = {
  incident: incidentType.isRequired,
  icon: iconType.isRequired,
};

export default MapInfoWindow;

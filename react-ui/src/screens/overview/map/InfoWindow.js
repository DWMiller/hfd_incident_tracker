import React, { PureComponent } from 'react';
import { format } from 'date-fns';

import { incidentDefinitions } from '../../../config/incident-definitions';
import { incidentType } from '../../../types';

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
    const { incident } = this.props;
    const icon = incident.icon;

    const type = incidentDefinitions[incident.category]
      ? incidentDefinitions[incident.category]
      : incidentDefinitions['UNKNOWN'];

    const date = format(new Date(incident.time), 'h:mm a');

    return (
      <InfoWindowWrapper>
        <IncidentLink incident={incident} />

        <img width={icon.width} height={icon.height} src={icon.file} alt={type.text} />
        {incident.locationName && <Location>{incident.locationName}</Location>}
        <Category>{type.text}</Category>
        <Address>{incident.location.address}</Address>

        <TwitterLink incident={incident} />

        <Time>{date}</Time>
      </InfoWindowWrapper>
    );
  }
}

MapInfoWindow.propTypes = {
  incident: incidentType.isRequired,
};

export default MapInfoWindow;

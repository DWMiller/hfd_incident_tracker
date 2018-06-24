import React, { PureComponent } from 'react';

import moment from 'moment';

import { InfoWindow } from 'react-google-maps';

import { incidentDefinitions } from '../../../config/incident-definitions';
import { incidentType, iconType } from '../../../types';

import { InfoWindowWrapper, Location, Category, Address, Time, TwitterLink } from './components';

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
        <InfoWindowWrapper>
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

export default MapInfoWindow;
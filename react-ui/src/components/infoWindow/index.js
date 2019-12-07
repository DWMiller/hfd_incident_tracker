import { format } from 'date-fns';
import React from 'react';
import PigeonOverlay from 'pigeon-overlay';

import { incidentDefinitions } from '../../config/incident-definitions';
import { incidentType } from '../../types';

import {
  InfoWindowWrapper,
  Location,
  Category,
  Address,
  Time,
  TwitterLink,
  IncidentLink,
} from './components';

function MapInfoWindow(props) {
  const { incident, anchor, left, top } = props;
  const icon = incident.icon;

  const type = incidentDefinitions[incident.category]
    ? incidentDefinitions[incident.category]
    : incidentDefinitions['UNKNOWN'];

  const date = format(new Date(incident.time), 'h:mm a');

  const rLeft = Math.round(left);
  const rTop = Math.round(top);

  return (
    <PigeonOverlay anchor={anchor} left={rLeft} top={rTop} className="infoWindow pigeon-drag-block">
      <InfoWindowWrapper>
        <div className="top">
          <img width={icon.width} height={icon.height} src={icon.file} alt={type.text} />
          <Category>{type.text}</Category>
          <IncidentLink incident={incident} />
        </div>

        {incident.locationName && <Location>{incident.locationName}</Location>}

        <Address>{incident.location.address}</Address>

        <TwitterLink incident={incident} />

        <Time>{date}</Time>
      </InfoWindowWrapper>
    </PigeonOverlay>
  );
}

MapInfoWindow.propTypes = {
  incident: incidentType.isRequired,
};

export default MapInfoWindow;

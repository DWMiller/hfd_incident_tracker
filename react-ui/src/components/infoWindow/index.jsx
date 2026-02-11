import { format } from 'date-fns';
import React from 'react';
import { Overlay } from 'pigeon-maps';
import { MdClose } from 'react-icons/md';
import { IoLocationSharp, IoTimeOutline } from 'react-icons/io5';

import { incidentDefinitions } from '../../config/incident-definitions';

import {
  InfoWindowWrapper,
  IconCircle,
  Location,
  Category,
  Address,
  Time,
  DetailRow,
  CloseButton,
  IncidentLink,
} from './components';

function MapInfoWindow(props) {
  const { incident, anchor, left, top, onClose } = props;
  const icon = incident.icon;

  const type = incidentDefinitions[incident.category]
    ? incidentDefinitions[incident.category]
    : incidentDefinitions['UNKNOWN'];

  const date = format(new Date(incident.time), 'MMM d, h:mm a');

  const rLeft = Math.round(left);
  const rTop = Math.round(top);

  return (
    <Overlay anchor={anchor} left={rLeft} top={rTop} className="infoWindow pigeon-drag-block">
      <InfoWindowWrapper $accentColor={icon.color}>
        <IncidentLink incident={incident} />
        <CloseButton onClick={onClose}>
          <MdClose />
        </CloseButton>

        <div className="top">
          <IconCircle $color={icon.color}>
            <img src={icon.file} alt={type.text} />
          </IconCircle>
          <Category>{type.text}</Category>
        </div>

        {incident.locationName && <Location>{incident.locationName}</Location>}

        <DetailRow>
          <IoLocationSharp />
          <Address>{incident.location.address}</Address>
        </DetailRow>

        <DetailRow>
          <IoTimeOutline />
          <Time>{date}</Time>
        </DetailRow>
      </InfoWindowWrapper>
    </Overlay>
  );
}

export default MapInfoWindow;

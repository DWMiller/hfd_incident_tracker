import React from 'react';
import styled from 'styled-components';
import { Overlay } from 'pigeon-maps';

const MarkerImage = styled.img`
  cursor: pointer;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
`;

export const MapMarker = React.memo(function MapMarker({ incident, anchor, left, top, setActiveMarker }) {
  const { height, width, file: url } = incident.icon;

  const rLeft = Math.round(left);
  const rTop = Math.round(top);

  return (
    <Overlay anchor={anchor} left={rLeft} top={rTop} style={{ userSelect: 'none' }}>
      <MarkerImage
        onClick={() => setActiveMarker(incident.id)}
        src={url}
        width={width}
        height={height}
        alt=""
      />
    </Overlay>
  );
});

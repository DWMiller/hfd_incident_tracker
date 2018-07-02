import React from 'react';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';

import MapMarker from './Marker';

export const Markers = ({ incidents = [], ...props }) => {
  return (
    <MarkerClusterer minimumClusterSize={3} maxZoom={12} gridSize={50}>
      {incidents.map(incident => {
        const isActive = props.activeMarker === incident.id;

        return (
          <MapMarker
            key={incident.id}
            isActive={isActive}
            incident={incident}
            position={incident.position}
            setActiveMarker={props.setActiveMarker}
          />
        );
      })}
    </MarkerClusterer>
  );
};

export default Markers;

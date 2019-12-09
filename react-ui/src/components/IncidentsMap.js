import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import styled from 'styled-components';

import { mapChange } from '../store/modules/mapSettings';
import { setActiveMarker } from '../store/modules/activeMarker';

import { filteredIncidentsSelector } from '../store/selectors';

import MapInfoWindow from './infoWindow';
import Map from './Map';
import { MapMarker } from './Marker';

const MapContainerWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;

  .infoWindow {
    z-index: 1000;
  }
`;

const getActiveMarker = createSelector(
  [state => state.incidents || [], state => state.activeMarker],
  (incidents, activeMarker) => {
    if (!activeMarker) {
      return null;
    }

    //TODO - Refactor state so incident can be selected by id
    return incidents.find(incident => incident.id === activeMarker);
  }
);

const renderMarkers = (incidents, handleMarkerSelect) => {
  return incidents.map(incident => {
    const { lat, lng } = incident.position;

    return (
      <MapMarker
        key={incident.id}
        incident={incident}
        anchor={[lat, lng]}
        setActiveMarker={handleMarkerSelect}
      />
    );
  });
};

function MapContainer() {
  const dispatch = useDispatch();

  const incidents = useSelector(filteredIncidentsSelector);
  const settings = useSelector(state => state.mapSettings);
  const activeMarker = useSelector(getActiveMarker);

  const handleMapChange = React.useCallback(
    ({ center, zoom }) => {
      dispatch(
        mapChange({
          center,
          zoom,
        })
      );
    },
    [dispatch]
  );

  const handleMapClick = React.useCallback(
    ({ event }) => {
      const infoWindow = document.querySelector('.infoWindow ');
      if (infoWindow && !infoWindow.contains(event.target)) {
        dispatch(setActiveMarker(null));
      }
    },
    [dispatch]
  );

  const handleMarkerSelect = React.useCallback(
    (id = null) => {
      dispatch(setActiveMarker(id));
    },
    [dispatch]
  );

  const renderedMarkers = React.useMemo(() => {
    return renderMarkers(incidents, handleMarkerSelect);
  }, [incidents, handleMarkerSelect]);

  return (
    <MapContainerWrapper>
      <Map {...settings} onBoundsChanged={handleMapChange} onClick={handleMapClick}>
        {renderedMarkers}
        {activeMarker && (
          <MapInfoWindow anchor={Object.values(activeMarker.position)} incident={activeMarker} />
        )}
      </Map>
    </MapContainerWrapper>
  );
}

export default MapContainer;

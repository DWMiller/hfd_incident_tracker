import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import styled from 'styled-components';

import { mapChange, setActiveMarker } from '../store/modules/mapSettings';

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
  [state => state.incidents || [], state => state.mapSettings.activeMarker],
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
    ({ center, zoom, bounds }) => {
      dispatch(
        mapChange({
          center,
          zoom,
          bounds,
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

  const mappableIncidents = React.useMemo(() => incidents.filter(i => i.position), [incidents]);

  const bounds = useSelector(state => state.mapSettings.bounds);

  const visibleIncidents = React.useMemo(() => {
    if (!bounds) return mappableIncidents;
    const latPad = (bounds.ne[0] - bounds.sw[0]) * 0.1;
    const lngPad = (bounds.ne[1] - bounds.sw[1]) * 0.1;
    const minLat = bounds.sw[0] - latPad;
    const maxLat = bounds.ne[0] + latPad;
    const minLng = bounds.sw[1] - lngPad;
    const maxLng = bounds.ne[1] + lngPad;
    return mappableIncidents.filter(({ position: { lat, lng } }) =>
      lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng
    );
  }, [mappableIncidents, bounds]);

  const renderedMarkers = React.useMemo(() => {
    return renderMarkers(visibleIncidents, handleMarkerSelect);
  }, [visibleIncidents, handleMarkerSelect]);

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

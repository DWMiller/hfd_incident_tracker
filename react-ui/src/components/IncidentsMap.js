import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { mapChange } from '../redux/mapSettingsReducer';
import { setActiveMarker } from '../redux/activeMarkerReducer';

import { filteredIncidentsSelector } from '../redux/selectors';

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

const renderMarkers = (incidents, activeMarker, handleMarkerSelect) => {
  return incidents.map(incident => {
    const isActive = activeMarker === incident.id;

    const { lat, lng } = incident.position;

    return (
      <MapMarker
        key={incident.id}
        isActive={isActive}
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
  const activeMarker = useSelector(state => state.activeMarker);

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

  const handleMarkerSelect = React.useCallback(
    (id = null) => {
      dispatch(setActiveMarker(id));
    },
    [dispatch]
  );

  const [lat, lng] = settings.center;

  const renderedMarkers = React.useMemo(() => {
    return renderMarkers(incidents, activeMarker, handleMarkerSelect);
  }, [incidents, activeMarker, handleMarkerSelect]);

  return (
    <MapContainerWrapper>
      <Map lat={lat} lng={lng} zoom={settings.zoom} onBoundsChanged={handleMapChange}>
        {renderedMarkers}
      </Map>
    </MapContainerWrapper>
  );
}

export default MapContainer;

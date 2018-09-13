import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { mapChange } from 'client/redux/mapSettingsReducer';
import { setActiveMarker } from 'client/redux/activeMarkerReducer';

import { filteredIncidentsSelector } from 'client/redux/selectors';

import { incidentType } from 'client/types';

import Map from 'client/components/Map';
import { MapMarker } from './map/Marker';

const MapContainerWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;

  .infoWindow {
    z-index: 2000;
  }
`;

class MapContainer extends PureComponent {
  mapRef = React.createRef(); //passe to MyMapComponent component to be bound to GoogleMap component

  timeout = null;

  handleMapChange = () => {
    // Debounce change events

    window.clearTimeout(this.timeout);
    this.timeout = window.setTimeout(
      () =>
        this.props.mapChange({
          center: this.mapRef.current.getCenter().toJSON(),
          zoom: this.mapRef.current.getZoom(),
        }),
      500
    );
  };

  render() {
    const { incidents, activeMarker, setActiveMarker } = this.props;

    return (
      <MapContainerWrapper>
        <Map
          {...this.props.settings.center}
          zoom={this.props.settings.zoom}
          onCenterChanged={this.handleMapChange}
          mapRef={this.mapRef}
          options={{
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
          }}
        >
          {incidents.map(incident => {
            const isActive = activeMarker === incident.id;

            const { lat, lng } = incident.position;

            return (
              <MapMarker
                key={incident.id}
                isActive={isActive}
                incident={incident}
                anchor={[lat, lng]}
                setActiveMarker={setActiveMarker}
              />
            );
          })}
        </Map>
      </MapContainerWrapper>
    );
  }
}

MapContainer.propTypes = {
  mapChange: PropTypes.func.isRequired,
  alerts: PropTypes.arrayOf(incidentType),
};

const mapStateToProps = state => {
  return {
    incidents: filteredIncidentsSelector(state),
    settings: state.mapSettings,
    activeMarker: state.activeMarker,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ mapChange, setActiveMarker }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);

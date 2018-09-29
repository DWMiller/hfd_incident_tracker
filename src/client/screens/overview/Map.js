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
    z-index: 1000;
  }
`;

class MapContainer extends PureComponent {
  handleMapChange = ({ center, zoom }) => {
    this.props.mapChange({
      center,
      zoom,
    });
  };

  render() {
    const { incidents, activeMarker, setActiveMarker, settings } = this.props;

    const [lat, lng] = settings.center;

    return (
      <MapContainerWrapper>
        <Map lat={lat} lng={lng} zoom={settings.zoom} onBoundsChanged={this.handleMapChange}>
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

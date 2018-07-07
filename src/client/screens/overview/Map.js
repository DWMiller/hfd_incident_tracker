import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actionCreators from 'client/redux/actionCreators';
import { filteredIncidentsSelector } from 'client/redux/selectors';

import { incidentType } from 'client/types';

import Map from 'client/components/Map';
import Markers from './map/Markers';

const MapContainerWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
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
          <Markers
            incidents={this.props.incidents}
            activeMarker={this.props.activeMarker}
            setActiveMarker={this.props.setActiveMarker}
          />
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
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);

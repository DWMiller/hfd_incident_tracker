import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../redux/actionCreators';
import { filteredIncidentsSelector } from '../../redux/selectors';

import { incidentType } from '../../types';

import Map from './Map';
import './Map.css';

import { googleMapURL } from './../../config';

class MapContainer extends PureComponent {
  static propTypes = {
    mapChange: PropTypes.func.isRequired,
    alerts: PropTypes.arrayOf(incidentType),
  };

  mapRef = React.createRef(); //passe to MyMapComponent component to be bound to GoogleMap component
  timeout = null;

  saveMapState = () => {
    this.props.mapChange({
      center: this.mapRef.current.getCenter().toJSON(),
      zoom: this.mapRef.current.getZoom(),
    });
  };

  onMapPropsChange = () => {
    // Debounce change events
    window.clearTimeout(this.timeout);
    this.timeout = window.setTimeout(this.saveMapState, 500);
  };

  render() {
    return (
      <div className="map-container">
        <Map
          googleMapURL={googleMapURL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          onMapPropsChange={this.onMapPropsChange}
          mapRef={this.mapRef}
          {...this.props}
        />
      </div>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../actions/actionCreators';
import { filteredIncidentsSelector } from '../../reducers/incidents';

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
      center: this.mapRef.value.getCenter().toJSON(),
      zoom: this.mapRef.value.getZoom(),
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
    settings: state.map.settings,
    activeMarker: state.map.activeMarker,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);

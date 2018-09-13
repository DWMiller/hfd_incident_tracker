import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PigeonOverlay from 'pigeon-overlay';

import { MapInfoWindow } from './InfoWindow';

import { incidentType } from 'client/types';

export class MapMarker extends PureComponent {
  onClick = () => this.props.setActiveMarker(this.props.isActive ? null : this.props.incident.id);

  render() {
    const { incident, ...props } = this.props;

    const { height, width, file: url } = this.props.incident.icon;

    return (
      <React.Fragment>
        <PigeonOverlay {...props}>
          <img onClick={this.onClick} src={url} width={width} height={height} alt="" />
        </PigeonOverlay>
        {this.props.isActive && (
          <MapInfoWindow onCloseClick={this.onClick} incident={this.props.incident} {...props} />
        )}
      </React.Fragment>
    );
  }
}

MapMarker.propTypes = {
  isActive: PropTypes.bool.isRequired,
  incident: incidentType.isRequired,
};

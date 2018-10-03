import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PigeonOverlay from 'pigeon-overlay';

import { MapInfoWindow } from './InfoWindow';

import { incidentType } from 'client/types';

const MarkerImage = styled.img`
  cursor: pointer;
`;

export class MapMarker extends PureComponent {
  onClick = () => this.props.setActiveMarker(this.props.isActive ? null : this.props.incident.id);

  render() {
    const { incident, anchor, left, top } = this.props;

    const { height, width, file: url } = incident.icon;

    const rLeft = Math.round(left);
    const rTop = Math.round(top);

    return (
      <React.Fragment>
        <PigeonOverlay anchor={anchor} left={rLeft} top={rTop}>
          <MarkerImage onClick={this.onClick} src={url} width={width} height={height} alt="" />
        </PigeonOverlay>
        {this.props.isActive && (
          <PigeonOverlay anchor={anchor} left={rLeft} top={rTop} className="infoWindow">
            <MapInfoWindow onCloseClick={this.onClick} incident={this.props.incident} />
          </PigeonOverlay>
        )}
      </React.Fragment>
    );
  }
}

MapMarker.propTypes = {
  isActive: PropTypes.bool.isRequired,
  incident: incidentType.isRequired,
};

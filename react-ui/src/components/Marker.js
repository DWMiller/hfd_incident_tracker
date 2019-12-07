import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PigeonOverlay from 'pigeon-overlay';

import { incidentType } from '../types';

const MarkerImage = styled.img`
  cursor: pointer;
`;

export class MapMarker extends PureComponent {
  onClick = event => {
    // event.stopPropagation();
    this.props.setActiveMarker(this.props.incident.id);
  };

  render() {
    const { incident, anchor, left, top } = this.props;

    const { height, width, file: url } = incident.icon;

    const rLeft = Math.round(left);
    const rTop = Math.round(top);

    return (
      <React.Fragment>
        <PigeonOverlay anchor={anchor} left={rLeft} top={rTop} style={{ userSelect: 'none' }}>
          <MarkerImage onClick={this.onClick} src={url} width={width} height={height} alt="" />
        </PigeonOverlay>
      </React.Fragment>
    );
  }
}

MapMarker.propTypes = {
  incident: incidentType.isRequired,
};

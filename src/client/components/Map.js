import React, { Component } from 'react';

import PigeonMap from 'pigeon-maps';

export class Map extends Component {
  render() {
    const { lng, lat, children, ...props } = this.props;

    return (
      <PigeonMap center={[lat, lng]} {...props}>
        {children}
      </PigeonMap>
    );
  }
}

export default Map;

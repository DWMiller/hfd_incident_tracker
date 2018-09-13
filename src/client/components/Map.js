import React, { Component } from 'react';

import PigeonMap from 'pigeon-maps';

export class Map extends Component {
  render() {
    const { lng, lat, children, mapRef, ...props } = this.props;

    return (
      <PigeonMap defaultCenter={[lat, lng]} defaultZoom={12} {...props}>
        {children}
      </PigeonMap>
    );
  }
}

export default Map;

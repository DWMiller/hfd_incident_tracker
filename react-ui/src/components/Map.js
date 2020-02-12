import React, { Component } from 'react';

import PigeonMap from 'pigeon-maps';

const provider = (x, y, z, dpr) => {
  return `https://api.maptiler.com/maps/basic/256/${z}/${x}/${y}${
    dpr >= 2 ? '@2x' : ''
  }.png?key=4JzO9h50SDZIjSvWYf5g`;
};

export class Map extends Component {
  render() {
    const { lng, lat, children, ...props } = this.props;

    return (
      <PigeonMap center={[lat, lng]} {...props} provider={provider} minZoom={11}>
        {children}
      </PigeonMap>
    );
  }
}

export default Map;

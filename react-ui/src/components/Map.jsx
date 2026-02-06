import React from 'react';
import { Map as PigeonMap } from 'pigeon-maps';

const provider = (x, y, z, dpr) => {
  return `https://api.maptiler.com/maps/basic/256/${z}/${x}/${y}${
    dpr >= 2 ? '@2x' : ''
  }.png?key=4JzO9h50SDZIjSvWYf5g`;
};

function Map({ lng, lat, children, ...props }) {
  return (
    <PigeonMap center={[lat, lng]} {...props} provider={provider} minZoom={11}>
      {children}
    </PigeonMap>
  );
}

export default Map;

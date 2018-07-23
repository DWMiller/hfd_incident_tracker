import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

import { googleMapURL } from 'client/config';

const defaultOptions = {};

export class Map extends Component {
  
  render() {
    let { lng, lat, options = {}, children, mapRef,  ...props = {} } = this.props;

    return (
      <GoogleMap
        defaultCenter={{ lat, lng }}
        zoom={12}
        width="100%"
        height="100%"
        options={{...defaultOptions, ...options}}
        ref={mapRef}
        {...props}
      >
        {children}
      </GoogleMap>
    );
  }
}

export default compose(
  withProps(({ width="100%", height="100%" }) => ({
    googleMapURL,
    loadingElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ width, height }} />,
  })),
  withScriptjs,
  withGoogleMap
)(Map);

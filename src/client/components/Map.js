import React, { Component } from 'react';
// import { compose, withProps } from 'recompose';
// import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
// import { googleMapURL } from 'client/config';

import PigeonMap from 'pigeon-maps';

// const defaultOptions = {};

export class Map extends Component {
  render() {
    const { lng, lat, children, mapRef, ...props } = this.props;

    // return (
    //   <GoogleMap
    //     defaultCenter={{ lat, lng }}
    //     zoom={12}
    //     width="100%"
    //     height="100%"
    //     options={{...defaultOptions, ...options}}
    //     ref={mapRef}
    //     {...props}
    //   >
    //     {children}
    //   </GoogleMap>
    // );

    return (
      <PigeonMap defaultCenter={[lat, lng]} defaultZoom={12} {...props}>
        {children}
      </PigeonMap>
    );
  }
}

export default Map;
// export default compose(
//   withProps(({ width="100%", height="100%" }) => ({
//     googleMapURL,
//     loadingElement: <div style={{ height: `100%` }} />,
//     mapElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ width, height }} />,
//   })),
//   withScriptjs,
//   withGoogleMap
// )(Map);

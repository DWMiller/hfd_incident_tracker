import React from 'react';
import PigeonOverlay from 'pigeon-overlay';

import Map from 'client/components/Map';

export class ScreenIncidentMap extends React.Component {
  render() {
    const { lat, lng } = this.props.incident.position;

    const { height, width, file: url } = this.props.incident.icon;

    return (
      <Map lat={lat} lng={lng} defaultZoom={12} height={240}>
        <PigeonOverlay anchor={[lat, lng]}>
          <img src={url} width={width} height={height} alt="" />
        </PigeonOverlay>
      </Map>
    );
  }
}

export default ScreenIncidentMap;

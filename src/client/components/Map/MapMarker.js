import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Marker, InfoWindow } from 'react-google-maps';

import { incidentType } from '../../types';
import { incidentDefinitions } from '../../config/incident-definitions';

import icons from '../../config/icons';

import './MapMarker.css';

const moment = require('moment');

function getIcon(alert) {
  let incidentType = incidentDefinitions[alert.category];

  if (typeof incidentType === 'undefined') {
    incidentType = incidentDefinitions.UNKNOWN;
  }

  const icon = icons[incidentType.icon];

  return icon;
}

class MapMarker extends PureComponent {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    alert: incidentType.isRequired,
  };

  state = {
    isOpen: false,
  };

  onClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const incident = this.props.alert;

    const type = incidentDefinitions[incident.category]
      ? incidentDefinitions[incident.category]
      : incidentDefinitions['UNKNOWN'];

    const icon = getIcon(incident);

    const markerIcon = {
      scaledSize: { height: icon.height, width: icon.width },
      url: icon.file,
    };

    const date = moment(incident.created).format('MMMM Do h:mm a');

    return (
      <Marker
        position={{ lat: this.props.lat, lng: this.props.lng }}
        defaultIcon={markerIcon}
        onClick={this.onClick}
      >
        {this.state.isOpen && (
          <InfoWindow>
            <div className="incident-info-window">
              <img
                className="icon"
                width={icon.width}
                height={icon.height}
                src={icon.file}
                alt={type.text}
              />

              {incident.locationName && (
                <span
                  className="location"
                  dangerouslySetInnerHTML={{ __html: incident.locationName }}
                />
              )}
              <span className="category">{type.text}</span>

              <span className="address">{incident.location.address}</span>

              <span className="link">
                <a
                  onClick={this.twitterLinkClick}
                  href={'https://twitter.com/HFD_Incidents/status/' + incident.id}
                >
                  View on Twitter
                </a>
              </span>

              <span className="time">{date}</span>
            </div>
          </InfoWindow>
        )}
      </Marker>
    );
  }
}

export default MapMarker;

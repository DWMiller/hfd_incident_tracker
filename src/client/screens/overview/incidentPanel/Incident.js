import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { incidentType } from 'client/types';

import { incidentDefinitions } from 'client/config/incident-definitions';

import icons from 'client/config/icons';

import { IncidentWrapper } from './incident/components';

const moment = require('moment');

class Incident extends PureComponent {
  onIncidentSelect = () => this.props.onIncidentSelect(this.props.incident);
  twitterLinkClick = e => e.stopPropagation();

  render() {
    const date = moment(this.props.incident.created).format('MMMM Do h:mm a');

    const type = incidentDefinitions[this.props.incident.category]
      ? incidentDefinitions[this.props.incident.category]
      : incidentDefinitions['UNKNOWN'];

    const { isActive, incident } = this.props;

    const icon = icons[type.icon];

    return (
      <IncidentWrapper
        onMouseOver={this.onIncidentHover}
        onClick={this.onIncidentSelect}
        className={isActive ? 'active' : ''}
      >
        <img
          className="icon"
          width={icon.width}
          height={icon.height}
          src={icon.file}
          alt={type.text}
        />
        {incident.locationName && (
          <span className="location" dangerouslySetInnerHTML={{ __html: incident.locationName }} />
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
      </IncidentWrapper>
    );
  }
}

Incident.propTypes = {
  onIncidentSelect: PropTypes.func.isRequired,
  incident: incidentType,
};

export default Incident;

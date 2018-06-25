import React from 'react';
import styled from 'styled-components';

import FaSearch from 'react-icons/lib/fa/search';

export const InfoWindowWrapper = styled.div`
  max-width: 150px;

  img {
    float: left;
    margin-right: 1em;
    object-fit: contain;
  }

  span {
    display: block;
  }
`;

export const Location = styled.span`
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Category = styled.span`
  font-weight: bold;
`;

export const Address = styled.span`
  margin: 0.5em 0 0.5em 0;
`;

export const Time = styled.span`
  font-size: smaller;
  text-align: right;
`;

export const TwitterLinkWrapper = styled.a`
  font-size: smaller;
  float: left;
`;

export const IncidentLinkWrapper = styled.a`
  font-size: smaller;
  float: right;
  cursor: pointer;
`;

export const IncidentLink = ({ incident, onClick }) => (
  <IncidentLinkWrapper onClick={() => onClick(incident.code)}>
    <FaSearch />
  </IncidentLinkWrapper>
);

export const TwitterLink = ({ incident }) => (
  <TwitterLinkWrapper
    onClick={this.twitterLinkClick}
    href={'https://twitter.com/HFD_Incidents/status/' + incident.id}
  >
    View on Twitter
  </TwitterLinkWrapper>
);

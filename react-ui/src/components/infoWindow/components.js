import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { FaExternalLinkAlt } from 'react-icons/fa';

export const InfoWindowWrapper = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 2px;
  box-shadow: ${props => props.theme.shadows['shadow-200']};
  max-width: 200px;
  font-weight: 300;
  font-size: ${props => props.theme.typeScale.small};

  .top {
    display: flex;
    align-items: center;
  }

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
  margin-top: 10px;
`;

export const Category = styled.span`
  font-weight: bold;
  flex: 1 0 auto;
`;

export const Address = styled.span`
  margin: 10px 0;
`;

export const Time = styled.span`
  font-size: ${props => props.theme.typeScale.extraSmall};
  text-align: right;
`;

export const TwitterLinkWrapper = styled.a`
  font-size: ${props => props.theme.typeScale.extraSmall};
  float: left;
`;

export const IncidentLinkWrapper = styled(Link)`
  font-size: ${props => props.theme.typeScale.extraSmall};
  float: right;
  cursor: pointer;

  svg {
    width: 1.5em;
    height: auto;
  }
`;

export const IncidentLink = ({ incident }) => (
  <IncidentLinkWrapper to={`/incident/${incident.code}`}>
    <FaExternalLinkAlt />
  </IncidentLinkWrapper>
);

export const TwitterLink = ({ incident }) => (
  <TwitterLinkWrapper
    target="_blank"
    rel="noopener noreferrer"
    href={'https://twitter.com/HFD_Incidents/status/' + incident.id}
  >
    View on Twitter
  </TwitterLinkWrapper>
);

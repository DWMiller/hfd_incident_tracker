import React from 'react';
import styled from 'styled-components';

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

export const Link = styled.span`
  font-size: smaller;
  float: left;
`;

export const TwitterLink = ({ incident }) => (
  <Link>
    <a
      onClick={this.twitterLinkClick}
      href={'https://twitter.com/HFD_Incidents/status/' + incident.id}
    >
      View on Twitter
    </a>
  </Link>
);

import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { FaExternalLinkAlt } from 'react-icons/fa';

export const InfoWindowWrapper = styled.div`
  background-color: white;
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows['shadow-200']};
  max-width: 320px;
  min-width: 280px;
  font-weight: 300;
  font-size: ${props => props.theme.typeScale.small};
  border-top: 4px solid ${props => props.$accentColor || props.theme.palette['grey-400']};
  position: relative;

  .top {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  }

  span {
    display: block;
  }
`;

export const IconCircle = styled.div`
  width: 44px;
  height: 44px;
  min-width: 44px;
  border-radius: 50%;
  background-color: ${props => `${props.$color || '#6B7280'}26`};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
`;

export const Category = styled.span`
  font-weight: bold;
  font-size: ${props => props.theme.typeScale.base};
  flex: 1 1 auto;
`;

export const Location = styled.span`
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DetailRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 8px;
  color: ${props => props.theme.palette['grey-600']};
  font-size: ${props => props.theme.typeScale.small};

  svg {
    min-width: 16px;
    margin-top: 2px;
    color: ${props => props.theme.palette['grey-400']};
  }
`;

export const Address = styled.span`
  line-height: 1.4;
`;

export const Time = styled.span`
  font-size: ${props => props.theme.typeScale.extraSmall};
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.palette['grey-400']};
  font-size: 16px;
  padding: 4px;
  display: flex;
  align-items: center;
  line-height: 1;

  &:hover {
    color: ${props => props.theme.palette['grey-700']};
  }
`;

export const IncidentLinkWrapper = styled(Link)`
  position: absolute;
  top: 12px;
  right: 40px;
  cursor: pointer;
  color: ${props => props.theme.palette['grey-400']};
  padding: 5px;
  display: flex;
  align-items: center;

  &:hover {
    color: ${props => props.theme.palette['grey-700']};
  }

  svg {
    width: 12px;
    height: 12px;
  }
`;

export const IncidentLink = ({ incident }) => (
  <IncidentLinkWrapper to={`/app/${incident.code}`}>
    <FaExternalLinkAlt />
  </IncidentLinkWrapper>
);

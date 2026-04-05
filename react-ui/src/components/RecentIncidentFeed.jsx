import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format, formatDistanceToNowStrict, isToday } from 'date-fns';
import styled from 'styled-components';

import { incidentDefinitions } from '../config/incident-definitions';
import { incidentsSelector } from '../store/selectors';

const MAX_VISIBLE_INCIDENTS = 5;

const FloatingWrapper = styled.aside`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1900;
  width: min(340px, calc(100vw - 20px));

  @media (max-width: 799px) {
    top: auto;
    right: 10px;
    bottom: 140px;
    left: 10px;
    width: auto;
  }
`;

const Panel = styled.div`
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: ${props => props.theme.shadows['shadow-300']};
  backdrop-filter: blur(10px);
`;

const Header = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px 10px;
  border-bottom: 1px solid ${props => props.theme.palette['grey-100']};
`;

const TitleGroup = styled.div`
  min-width: 0;
`;

const Eyebrow = styled.p`
  margin: 0 0 2px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${props => props.theme.palette['grey-500']};
`;

const Title = styled.h2`
  margin: 0;
  font-size: ${props => props.theme.typeScale.base};
  line-height: 1.2;
`;

const HeaderLink = styled(Link)`
  color: #1976d2;
  font-size: 12px;
  white-space: nowrap;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ActivityList = styled.div`
  max-height: min(360px, 48vh);
  overflow-y: auto;
`;

const ActivityItem = styled.div`
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  gap: 12px;
  padding: 12px 16px;
  border-top: 1px solid ${props => props.theme.palette['grey-050']};

  &:first-child {
    border-top: none;
  }
`;

const IconTile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${props => `${props.$color || '#6B7280'}18`};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 22px;
    height: 22px;
    object-fit: contain;
  }
`;

const EventBody = styled.div`
  min-width: 0;
`;

const EventTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const EventType = styled.div`
  min-width: 0;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.3;
  color: ${props => props.theme.palette['grey-900']};
`;

const EventMeta = styled.div`
  flex-shrink: 0;
  font-size: 11px;
  color: ${props => props.theme.palette['grey-500']};
  white-space: nowrap;
`;

const EventLocation = styled.p`
  margin: 4px 0 0;
  font-size: 12px;
  line-height: 1.35;
  color: ${props => props.theme.palette['grey-700']};
`;

const EventTime = styled.p`
  margin: 2px 0 0;
  font-size: 11px;
  color: ${props => props.theme.palette['grey-500']};
`;

const Badge = styled.span`
  display: inline-block;
  margin-left: 6px;
  padding: 2px 6px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  background: #fff3e0;
  color: #e65100;
`;

const EmptyState = styled.p`
  margin: 0;
  padding: 16px;
  font-size: 12px;
  color: ${props => props.theme.palette['grey-500']};
`;

function formatEventTime(time) {
  const date = new Date(time);
  const absolute = isToday(date) ? format(date, 'h:mm a') : format(date, 'MMM d, h:mm a');
  const relative = formatDistanceToNowStrict(date, { addSuffix: true });
  return { absolute, relative };
}

function RecentIncidentFeed({ embedded }) {
  const incidents = useSelector(incidentsSelector);

  const recentIncidents = React.useMemo(() => {
    return [...incidents]
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, MAX_VISIBLE_INCIDENTS);
  }, [incidents]);

  const list = recentIncidents.length === 0 ? (
    <EmptyState>No recent incidents available.</EmptyState>
  ) : (
    <ActivityList style={embedded ? { maxHeight: 'none' } : undefined}>
      {recentIncidents.map(incident => {
        const def = incidentDefinitions[incident.category] || incidentDefinitions.UNKNOWN;
        const icon = incident.icon;
        const { absolute, relative } = formatEventTime(incident.time);
        const location = incident.mappable
          ? incident.location?.address || 'Address unavailable'
          : 'Location withheld';

        return (
          <ActivityItem key={incident.id}>
            <IconTile $color={icon?.color}>
              {icon && <img src={icon.file} alt="" />}
            </IconTile>

            <EventBody>
              <EventTop>
                <EventType>
                  {def.text}
                  {!incident.mappable && <Badge>Restricted</Badge>}
                </EventType>
                <EventMeta>{relative}</EventMeta>
              </EventTop>

              <EventLocation>{location}</EventLocation>
              <EventTime>{absolute}</EventTime>
            </EventBody>
          </ActivityItem>
        );
      })}
    </ActivityList>
  );

  if (embedded) {
    return (
      <>
        <Header>
          <TitleGroup>
            <Eyebrow>Live Feed</Eyebrow>
            <Title>Recent activity</Title>
          </TitleGroup>
          <HeaderLink to="/app/activity">All activity</HeaderLink>
        </Header>
        {list}
      </>
    );
  }

  return (
    <FloatingWrapper>
      <Panel>
        <Header>
          <TitleGroup>
            <Eyebrow>Live Feed</Eyebrow>
            <Title>Recent activity</Title>
          </TitleGroup>
          <HeaderLink to="/app/activity">All activity</HeaderLink>
        </Header>
        {list}
      </Panel>
    </FloatingWrapper>
  );
}

export default RecentIncidentFeed;

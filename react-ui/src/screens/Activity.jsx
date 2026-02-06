import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import styled from 'styled-components';

import { incidentsSelector } from '../store/selectors';
import { incidentDefinitions } from '../config/incident-definitions';

const Page = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;

  h1 {
    margin: 0;
    font-size: 20px;
  }

  a {
    color: #1976d2;
    font-size: 14px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;

  th {
    text-align: left;
    padding: 8px;
    border-bottom: 2px solid #ddd;
    font-size: 12px;
    color: #666;
    text-transform: uppercase;
  }

  td {
    padding: 8px;
    border-bottom: 1px solid #eee;
    vertical-align: top;
  }

  tr:hover td {
    background: #f9f9f9;
  }
`;

const Badge = styled.span`
  display: inline-block;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 11px;
  background: ${props => (props.$restricted ? '#fff3e0' : '#e8f5e9')};
  color: ${props => (props.$restricted ? '#e65100' : '#2e7d32')};
`;

function Activity() {
  const incidents = useSelector(incidentsSelector);

  const sorted = React.useMemo(
    () => [...incidents].sort((a, b) => new Date(b.time) - new Date(a.time)),
    [incidents]
  );

  return (
    <Page>
      <Header>
        <h1>All Activity</h1>
        <Link to="/">Back to map</Link>
      </Header>
      <p style={{ fontSize: 13, color: '#666', margin: '0 0 16px' }}>
        {sorted.length} incidents. Location-restricted calls (e.g. medical) are included here without addresses.
      </p>
      <Table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Type</th>
            <th>Location</th>
            <th>Units</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(incident => {
            const def = incidentDefinitions[incident.category] || incidentDefinitions.UNKNOWN;
            return (
              <tr key={incident.id}>
                <td style={{ whiteSpace: 'nowrap' }}>
                  {format(new Date(incident.time), 'MMM d, h:mm a')}
                </td>
                <td>
                  {def.text}
                  {!incident.mappable && (
                    <>
                      {' '}
                      <Badge $restricted>restricted</Badge>
                    </>
                  )}
                </td>
                <td>{incident.location.address || '\u2014'}</td>
                <td>{incident.units || '\u2014'}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Page>
  );
}

export default Activity;

import React from 'react';
import styled from 'styled-components';

import IncidentsMap from '../components/IncidentsMap';
import IncidentFilter from '../components/incidentFilter';
import DateSelector from '../components/DateSelector';
import RecentIncidentFeed from '../components/RecentIncidentFeed';

const Container = styled.div`
  height: 100vh;
  height: -webkit-fill-available;

  width: 100vw;
  overflow: hidden;
`;

function ScreenOverview() {
  return (
    <Container>
      <IncidentsMap />
      <IncidentFilter />
      <RecentIncidentFeed />
      <DateSelector />
    </Container>
  );
}

export default ScreenOverview;

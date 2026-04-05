import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import useMediaQuery from '../hooks/useMediaQuery';
import IncidentsMap from '../components/IncidentsMap';
import IncidentFilter from '../components/incidentFilter';
import DateSelector from '../components/DateSelector';
import RecentIncidentFeed from '../components/RecentIncidentFeed';
import MobileBottomSheet from '../components/MobileBottomSheet';

const Container = styled.div`
  height: 100vh;
  height: -webkit-fill-available;

  width: 100vw;
  overflow: hidden;
`;

function ScreenOverview() {
  const isMobile = useMediaQuery('(max-width: 799px)');
  const [sheetState, setSheetState] = useState('collapsed');

  const collapseSheet = useCallback(() => setSheetState('collapsed'), []);

  return (
    <Container>
      <IncidentsMap onMapTap={isMobile ? collapseSheet : undefined} />
      {isMobile ? (
        <MobileBottomSheet sheetState={sheetState} setSheetState={setSheetState} />
      ) : (
        <>
          <IncidentFilter />
          <RecentIncidentFeed />
          <DateSelector />
        </>
      )}
    </Container>
  );
}

export default ScreenOverview;

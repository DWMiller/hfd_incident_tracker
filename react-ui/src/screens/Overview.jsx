import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import useMediaQuery from '../hooks/useMediaQuery';
import IncidentsMap from '../components/IncidentsMap';
import IncidentFilter from '../components/incidentFilter';
import DateSelector from '../components/DateSelector';
import RecentIncidentFeed from '../components/RecentIncidentFeed';
import MobileBottomSheet from '../components/MobileBottomSheet';

const Container = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;

  /* Prevent body scroll while this screen is mounted */
  & ~ * {
    overflow: hidden;
  }
`;

// Lock body scroll while the map screen is active
const useBodyScrollLock = () => {
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);
};

function ScreenOverview() {
  useBodyScrollLock();
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

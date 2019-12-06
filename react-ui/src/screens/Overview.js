import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IncidentsMap from '../components/IncidentsMap';

// import IncidentPanel from './overview/IncidentPanel';
import IncidentFilter from '../components/incidentFilter';

const PageContainer = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

function ScreenOverview() {
  return (
    <PageContainer>
      <IncidentsMap />
      <IncidentFilter />
      {/* <IncidentPanel /> */}
    </PageContainer>
  );
}

ScreenOverview.propTypes = {
  state: PropTypes.object,
};

export default ScreenOverview;

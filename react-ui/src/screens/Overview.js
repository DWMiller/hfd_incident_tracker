import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import OverviewMap from './overview/Map';

// import IncidentPanel from './overview/IncidentPanel';
import IncidentFilter from './overview/IncidentFilter';

const PageContainer = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

function ScreenOverview() {
  return (
    <PageContainer>
      <OverviewMap />
      <IncidentFilter />
      {/* <IncidentPanel /> */}
    </PageContainer>
  );
}

ScreenOverview.propTypes = {
  state: PropTypes.object,
};

export default ScreenOverview;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IncidentsMap from '../components/IncidentsMap';

// import IncidentPanel from './overview/IncidentPanel';

import IncidentFilter from '../components/incidentFilter';
import DateSelector from 'components/DateSelector';

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
      <DateSelector />
      {/* <IncidentPanel /> */}
    </Container>
  );
}

ScreenOverview.propTypes = {
  state: PropTypes.object,
};

export default ScreenOverview;

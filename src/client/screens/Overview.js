import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from 'client/redux/actionCreators';

import OverviewMap from './overview/Map';

// import IncidentPanel from './overview/IncidentPanel';
import IncidentFilter from './overview/IncidentFilter';
import DateSelector from './overview/DateSelector';

const PageContainer = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

export class ScreenOverview extends Component {
  render() {
    return (
      <PageContainer>
        <OverviewMap />
        <IncidentFilter />
        {/* <IncidentPanel /> */}
        <DateSelector />
      </PageContainer>
    );
  }
}

ScreenOverview.propTypes = {
  state: PropTypes.object,
};


const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(ScreenOverview);

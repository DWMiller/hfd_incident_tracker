import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import styled from 'styled-components';

const ListWrapper = styled.div`
  .list-enter {
    opacity: 0.01;
  }

  .list-enter.list-enter-active {
    opacity: 1;
    transition-delay: 1s;
    transition: opacity 1000ms ease-in;
  }
`;

class List extends Component {
  render() {
    return (
      <ListWrapper>
        <ReactCSSTransitionGroup
          transitionName="list"
          transitionEnterTimeout={2000}
          transitionLeave={false}
        >
          {this.props.children}
        </ReactCSSTransitionGroup>
      </ListWrapper>
    );
  }
}

List.propTypes = {};

export default List;

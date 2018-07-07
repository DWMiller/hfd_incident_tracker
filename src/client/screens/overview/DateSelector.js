import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Slider from 'react-slick';

import * as actionCreators from 'client/redux/actionCreators';

import { DateSelectorContainer, DateSlide } from './dateSelector/components';

const initialSlide = 0;

const sliderSettings = {
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerPadding: '50px',
  initialSlide,
};

export class DateSelector extends Component {
  constructor(props) {
    super(props);

    const today = moment();

    const dates = [
      {
        date: today.format('YYYY-MM-DD'),
        label: 'Today',
      },
    ];

    // Uncomment when date scrolling is supported in api + filter
    // for (let i = 6; i >= 0; i--) {
    //   const newDate = moment(today)
    //     .subtract(i, 'days')
    //     .format('YYYY-MM-DD');

    //   dates.push({
    //     date: newDate,
    //     label: i === 0 ? 'Today' : newDate,
    //   });
    // }

    this.state = { dates, initialSlide };
  }

  afterChange = index => {
    this.props.setDateFilter(this.state.dates[index].date);
  };

  render() {
    return (
      <DateSelectorContainer>
        {console.log(this.state.dates)}
        <Slider afterChange={this.afterChange} {...sliderSettings}>
          {this.state.dates.map(date => <DateSlide key={date.date}>{date.label}</DateSlide>)}
        </Slider>
      </DateSelectorContainer>
    );
  }
}

DateSelector.proptypes = {
  incidents: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateSelector);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { subDays, format } from 'date-fns';
import Slider from 'react-slick';

import { setDateFilter } from 'client/redux/filters/date';

import { DateSelectorContainer, DateSlide } from './dateSelector/components';

const initialSlide = 6;

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

    const today = new Date();

    const dates = [];

    for (let i = 6; i >= 0; i--) {
      const newDate = subDays(today, i);

      dates.push({
        date: format(newDate, 'yyyy-MM-dd'),
        label: i === 0 ? 'Today' : format(newDate, 'yyyy-MM-dd'),
      });
    }

    this.state = { dates, initialSlide };
  }

  afterChange = index => {
    this.props.setDateFilter(this.state.dates[index].date);
  };

  render() {
    return (
      <DateSelectorContainer>
        <Slider afterChange={this.afterChange} {...sliderSettings}>
          {this.state.dates.map(date => (
            <DateSlide key={date.date}>{date.label}</DateSlide>
          ))}
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
  return bindActionCreators({ setDateFilter }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateSelector);

import React from 'react';
import { shallow } from 'enzyme';
import IncidentList from './IncidentList';

describe('<IncidentList />', () => {
  test('renders', () => {
    const wrapper = shallow(<IncidentList />);
    expect(wrapper).toMatchSnapshot();
  });
});

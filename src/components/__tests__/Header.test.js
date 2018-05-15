import { shallow } from 'enzyme';
import React from 'react';
import Header from '../Header';

test('renders DOM for a header', () => {
  const dom = shallow(<Header />);
  expect(dom).toMatchSnapshot();
});

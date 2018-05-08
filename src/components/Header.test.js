import React from 'react';
import { shallow } from '../../test';
import Header from './Header';

test('renders DOM for the header', () => {
  const dom = shallow(<Header />);
  expect(dom).toMatchSnapshot();
});

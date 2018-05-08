import React from 'react';
import { shallow } from '../../test';
import Footer from './Footer';

test('renders DOM for the footer', () => {
  const dom = shallow(<Footer />);
  expect(dom).toMatchSnapshot();
});

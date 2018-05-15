import { shallow } from 'enzyme';
import React from 'react';
import Footer from '../Footer';

test('renders DOM for the footer', () => {
  const dom = shallow(<Footer />);
  expect(dom).toMatchSnapshot();
});

import { shallow } from 'enzyme';
import React from 'react';
import Link from '../Link';

test('renders DOM for a link', () => {
  const dom = shallow(<Link href="https://bitbrew.com" />);
  expect(dom).toMatchSnapshot();
});

import { shallow } from 'enzyme';
import React from 'react';
import Content from '../Content';

test('renders DOM for some content', () => {
  const dom = shallow(<Content />);
  expect(dom).toMatchSnapshot();
});

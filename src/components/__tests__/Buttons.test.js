import { diffComponents } from 'bitbrew-test-helpers';
import { shallow } from 'enzyme';
import React from 'react';
import styled from 'styled-components';
import { baseStyles, RaisedButton, TextButton } from '../Buttons';

const BaseButton = styled.button`
  ${baseStyles};
`;

test('renders DOM shared by all buttons', () => {
  const dom = shallow(<BaseButton />);
  expect(dom).toMatchSnapshot();
});

test('renders DOM specific to a raised button', () => {
  const base = <BaseButton />;
  const comp = <RaisedButton />;
  const diff = diffComponents(base, comp);
  expect(diff).toMatchSnapshot();
});

test('renders DOM specific to a text button', () => {
  const base = <BaseButton />;
  const comp = <TextButton />;
  const diff = diffComponents(base, comp);
  expect(diff).toMatchSnapshot();
});

import { diffComponents } from 'bitbrew-test-helpers';
import { shallow } from 'enzyme';
import React from 'react';
import styled from 'styled-components';
import { baseStyles, Input, RaisedInput } from '../Inputs';

const BaseInput = styled.input`
  ${baseStyles};
`;

test('renders DOM shared by all inputs', () => {
  const dom = shallow(<BaseInput />);
  expect(dom).toMatchSnapshot();
});

test('renders DOM specific to a default input', () => {
  const base = <BaseInput />;
  const comp = <Input />;
  const diff = diffComponents(base, comp);
  expect(diff).toMatchSnapshot();
});

test('renders DOM specific to a raised input', () => {
  const base = <BaseInput />;
  const comp = <RaisedInput />;
  const diff = diffComponents(base, comp);
  expect(diff).toMatchSnapshot();
});

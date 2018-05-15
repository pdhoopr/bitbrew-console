import { diffComponents } from 'bitbrew-test-helpers';
import { shallow } from 'enzyme';
import React from 'react';
import styled from 'styled-components';
import { baseStyles, Logomark, Logotype } from '../Logos';

const BaseLogo = styled.svg`
  ${baseStyles};
`;

test('renders DOM shared by all logos', () => {
  const dom = shallow(<BaseLogo />);
  expect(dom).toMatchSnapshot();
});

test('renders DOM specific to the logomark', () => {
  const base = <BaseLogo />;
  const comp = <Logomark />;
  const diff = diffComponents(base, comp);
  expect(diff).toMatchSnapshot();
});

test('renders DOM specific to the logotype', () => {
  const base = <BaseLogo />;
  const comp = <Logotype />;
  const diff = diffComponents(base, comp);
  expect(diff).toMatchSnapshot();
});

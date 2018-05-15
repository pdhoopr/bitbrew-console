import { diffComponents } from 'bitbrew-test-helpers';
import { shallow } from 'enzyme';
import React from 'react';
import styled from 'styled-components';
import { FlexBetween, FlexCenter, FlexEnd, baseStyles } from '../Flexboxes';

const BaseFlex = styled.div`
  ${baseStyles};
`;

test('renders DOM shared by all flex containers', () => {
  const dom = shallow(<BaseFlex />);
  expect(dom).toMatchSnapshot();
});

test('renders DOM specific to a flex container with space between elements', () => {
  const base = <BaseFlex />;
  const comp = <FlexBetween />;
  const diff = diffComponents(base, comp);
  expect(diff).toMatchSnapshot();
});

test('renders DOM specific to a flex container with elements aligned in the center', () => {
  const base = <BaseFlex />;
  const comp = <FlexCenter />;
  const diff = diffComponents(base, comp);
  expect(diff).toMatchSnapshot();
});

test('renders DOM specific to a flex container with elements aligned at the end', () => {
  const base = <BaseFlex />;
  const comp = <FlexEnd />;
  const diff = diffComponents(base, comp);
  expect(diff).toMatchSnapshot();
});

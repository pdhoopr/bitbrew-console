import styled, { css } from 'styled-components';
import Mark from '../graphics/logomark.svg';
import Type from '../graphics/logotype.svg';

const baseStyles = css`
  display: block;
  height: var(--size-40);
  width: auto;
`;

export const Logomark = styled(Mark)`
  ${baseStyles};
`;

export const Logotype = styled(Type)`
  ${baseStyles};
`;

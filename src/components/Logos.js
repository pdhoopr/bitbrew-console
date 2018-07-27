import styled, { css } from 'styled-components';
import LogomarkSvg from '../images/logomark.svg';
import LogotypeSvg from '../images/logotype.svg';

const baseStyles = css`
  display: block;
  height: var(--size-40);
  width: auto;
`;

export const Logomark = styled(LogomarkSvg)`
  ${baseStyles};
`;

export const Logotype = styled(LogotypeSvg)`
  ${baseStyles};
`;

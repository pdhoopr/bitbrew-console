import styled, { css } from 'styled-components';
import BackArrowSvg from '../graphics/back-arrow-icon.svg';
import CloseSvg from '../graphics/close-icon.svg';
import SearchSvg from '../graphics/search-icon.svg';

const baseStyles = css`
  fill: var(--color-dark-gray);
  height: var(--size-20);
  vertical-align: middle;
  width: var(--size-20);
`;

export const BackArrowIcon = styled(BackArrowSvg)`
  ${baseStyles};
`;

export const CloseIcon = styled(CloseSvg)`
  ${baseStyles};
`;

export const SearchIcon = styled(SearchSvg)`
  ${baseStyles};
`;
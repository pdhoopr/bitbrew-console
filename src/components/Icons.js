import styled, { css } from 'styled-components';
import BackSvg from '../graphics/back-icon.svg';
import CloseSvg from '../graphics/close-icon.svg';
import DropdownSvg from '../graphics/dropdown-icon.svg';
import SearchSvg from '../graphics/search-icon.svg';

const baseStyles = css`
  fill: var(--color-dark-gray);
  height: var(--size-20);
  vertical-align: middle;
  width: var(--size-20);
`;

export const BackIcon = styled(BackSvg)`
  ${baseStyles};
`;

export const CloseIcon = styled(CloseSvg)`
  ${baseStyles};
`;

export const DropdownIcon = styled(DropdownSvg)`
  ${baseStyles};
`;

export const SearchIcon = styled(SearchSvg)`
  ${baseStyles};
`;

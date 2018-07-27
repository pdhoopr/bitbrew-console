import styled, { css } from 'styled-components';
import BackIconSvg from '../images/back-icon.svg';
import CloseIconSvg from '../images/close-icon.svg';
import DropdownIconSvg from '../images/dropdown-icon.svg';
import MoreIconSvg from '../images/more-icon.svg';
import SearchIconSvg from '../images/search-icon.svg';

const baseStyles = css`
  fill: var(--color-dark-gray);
  height: var(--size-20);
  vertical-align: middle;
  width: var(--size-20);
`;

export const BackIcon = styled(BackIconSvg)`
  ${baseStyles};
`;

export const CloseIcon = styled(CloseIconSvg)`
  ${baseStyles};
`;

export const DropdownIcon = styled(DropdownIconSvg)`
  ${baseStyles};
`;

export const MoreIcon = styled(MoreIconSvg)`
  ${baseStyles};
`;

export const SearchIcon = styled(SearchIconSvg)`
  ${baseStyles};
`;

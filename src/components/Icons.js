import styled, { css } from 'styled-components';
import BackSvg from '../images/back.svg';
import CloseSvg from '../images/close.svg';
import DropdownSvg from '../images/dropdown.svg';
import MoreSvg from '../images/more.svg';
import SearchSvg from '../images/search.svg';

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

export const MoreIcon = styled(MoreSvg)`
  ${baseStyles};
`;

export const SearchIcon = styled(SearchSvg)`
  ${baseStyles};
`;

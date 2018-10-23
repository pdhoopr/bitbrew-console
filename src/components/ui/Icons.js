import styled, { css } from 'styled-components';
import AddSvg from './images/add.svg';
import ArrowDownSvg from './images/arrow-down.svg';
import BackSvg from './images/back.svg';
import CheckboxSelectedSvg from './images/checkbox-selected.svg';
import CheckboxSvg from './images/checkbox.svg';
import CloseSvg from './images/close.svg';
import ErrorSvg from './images/error.svg';
import MoreSvg from './images/more.svg';
import RadioButtonSelectedSvg from './images/radio-button-selected.svg';
import SearchSvg from './images/search.svg';
import SyncDisabledSvg from './images/sync-disabled.svg';
import SyncSvg from './images/sync.svg';

const baseStyles = css`
  fill: var(--color-dark-gray);
  height: var(--size-20);
  vertical-align: middle;
  width: var(--size-20);
`;

export const AddIcon = styled(AddSvg)`
  ${baseStyles};
`;

export const ArrowDownIcon = styled(ArrowDownSvg)`
  ${baseStyles};
`;

export const BackIcon = styled(BackSvg)`
  ${baseStyles};
`;

export const CheckboxIcon = styled(CheckboxSvg)`
  ${baseStyles};
`;

export const CheckboxSelectedIcon = styled(CheckboxSelectedSvg)`
  ${baseStyles};
  fill: var(--color-green);
`;

export const CloseIcon = styled(CloseSvg)`
  ${baseStyles};
`;

export const ErrorIcon = styled(ErrorSvg)`
  ${baseStyles};
  fill: var(--color-red);
`;

export const MoreIcon = styled(MoreSvg)`
  ${baseStyles};
`;

export const RadioButtonSelectedIcon = styled(RadioButtonSelectedSvg)`
  ${baseStyles};
  fill: var(--color-green);
`;

export const SearchIcon = styled(SearchSvg)`
  ${baseStyles};
`;

export const SyncIcon = styled(SyncSvg)`
  ${baseStyles};
  fill: var(--color-green);
`;

export const SyncDisabledIcon = styled(SyncDisabledSvg)`
  ${baseStyles};
`;

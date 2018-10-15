import styled, { css } from 'styled-components';
import AddSvg from '../images/add.svg';
import BackSvg from '../images/back.svg';
import CheckboxOutlineSvg from '../images/checkbox-outline.svg';
import CheckboxSvg from '../images/checkbox.svg';
import CloseSvg from '../images/close.svg';
import DisabledSyncSvg from '../images/disabled-sync.svg';
import DropdownSvg from '../images/dropdown.svg';
import EnabledSyncSvg from '../images/enabled-sync.svg';
import ErrorSvg from '../images/error.svg';
import MoreSvg from '../images/more.svg';
import RadioButtonSvg from '../images/radio-button.svg';
import SearchSvg from '../images/search.svg';

const baseStyles = css`
  fill: var(--color-dark-gray);
  height: var(--size-20);
  vertical-align: middle;
  width: var(--size-20);
`;

export const AddIcon = styled(AddSvg)`
  ${baseStyles};
`;

export const BackIcon = styled(BackSvg)`
  ${baseStyles};
`;

export const CheckboxIcon = styled(CheckboxSvg)`
  ${baseStyles};
  fill: var(--color-green);
`;

export const CheckboxOutlineIcon = styled(CheckboxOutlineSvg)`
  ${baseStyles};
`;

export const CloseIcon = styled(CloseSvg)`
  ${baseStyles};
`;

export const DisabledSyncIcon = styled(DisabledSyncSvg)`
  ${baseStyles};
`;

export const DropdownIcon = styled(DropdownSvg)`
  ${baseStyles};
`;

export const EnabledSyncIcon = styled(EnabledSyncSvg)`
  ${baseStyles};
  fill: var(--color-green);
`;

export const ErrorIcon = styled(ErrorSvg)`
  ${baseStyles};
  fill: var(--color-red);
`;

export const MoreIcon = styled(MoreSvg)`
  ${baseStyles};
`;

export const RadioButtonIcon = styled(RadioButtonSvg)`
  ${baseStyles};
  fill: var(--color-green);
`;

export const SearchIcon = styled(SearchSvg)`
  ${baseStyles};
`;

import styled, { css } from "styled-components";
import ArrowDownSvg from "../../icons/arrow-down.svg";
import ArrowUpSvg from "../../icons/arrow-up.svg";
import BackSvg from "../../icons/back.svg";
import CheckboxSelectedSvg from "../../icons/checkbox-selected.svg";
import CheckboxSvg from "../../icons/checkbox.svg";
import CloseSvg from "../../icons/close.svg";
import ErrorSvg from "../../icons/error.svg";
import LogoSvg from "../../icons/logo.svg";
import MoreSvg from "../../icons/more.svg";
import RadioButtonSelectedSvg from "../../icons/radio-button-selected.svg";
import RadioButtonSvg from "../../icons/radio-button.svg";
import SearchSvg from "../../icons/search.svg";
import SyncDisabledSvg from "../../icons/sync-disabled.svg";
import SyncSvg from "../../icons/sync.svg";

const baseStyles = css`
  fill: var(--color-dark-gray);
  height: var(--size-20);
  vertical-align: middle;
  width: var(--size-20);
`;

export const ArrowDownIcon = styled(ArrowDownSvg)`
  ${baseStyles};
`;

export const ArrowDownInlineIcon = styled(ArrowDownSvg).attrs({
  "aria-hidden": true,
})`
  fill: currentColor;
  height: var(--size-16);
  margin-right: calc(-1 * var(--size-4));
  vertical-align: middle;
  width: var(--size-16);
`;

export const ArrowUpIcon = styled(ArrowUpSvg)`
  ${baseStyles};
`;

export const ArrowUpInlineIcon = styled(ArrowUpSvg).attrs({
  "aria-hidden": true,
})`
  fill: currentColor;
  height: var(--size-16);
  margin-right: calc(-1 * var(--size-4));
  vertical-align: middle;
  width: var(--size-16);
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

export const LogoIcon = styled(LogoSvg)`
  display: block;
  fill: var(--color-white);
  height: var(--size-32);
  width: auto;
`;

export const MoreIcon = styled(MoreSvg)`
  ${baseStyles};
`;

export const RadioButtonIcon = styled(RadioButtonSvg)`
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

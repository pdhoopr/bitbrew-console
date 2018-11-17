import styled from "styled-components";
import {
  CheckboxIcon,
  CheckboxSelectedIcon,
  RadioButtonIcon,
  RadioButtonSelectedIcon,
} from "./Icons";

export const Form = styled.form.attrs({
  autoComplete: "off",
  noValidate: true,
})`
  background-color: var(--color-white);
  border-radius: var(--corner-radius);
  box-shadow: var(--elevation-low);
  margin-bottom: var(--size-32);
  padding: var(--size-16) var(--size-24);
`;

export const Fieldset = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
`;

export const Legend = styled.legend`
  font-weight: var(--weight-bold);
  letter-spacing: var(--letter-spacing);
  margin-bottom: var(--size-8);
  padding-left: 0;
  padding-right: 0;
`;

export const Label = styled.label`
  display: block;
  font-weight: var(--weight-bold);
  letter-spacing: var(--letter-spacing);
  margin-bottom: var(--size-16);
`;

export const Choice = styled(Label)`
  font-weight: var(--weight-regular);
  letter-spacing: normal;
  position: relative;

  ${/* sc-selector */ Fieldset} & {
    &:not(:last-of-type) {
      margin-bottom: var(--size-8);
    }
  }

  ${/* sc-selector */ CheckboxIcon},
  ${/* sc-selector */ CheckboxSelectedIcon},
  ${/* sc-selector */ RadioButtonIcon},
  ${/* sc-selector */ RadioButtonSelectedIcon} {
    margin-left: calc(-1 * var(--size-2));
    margin-right: var(--size-8);
    vertical-align: -25%;
  }
`;

export const Input = styled.input.attrs({
  autoComplete: "off",
  type: "text",
})`
  border: 1px solid var(--color-medium-gray);
  border-radius: var(--corner-radius);
  color: var(--color-black);
  display: block;
  font-family: var(--font-roboto);
  font-size: var(--size-14);
  line-height: var(--size-20);
  margin: 0;
  padding: var(--size-7) var(--size-16);
  transition: border-color var(--duration-short);
  width: 100%;

  &::placeholder {
    color: var(--color-dark-gray);
  }

  ${/* sc-selector */ Label} & {
    margin-top: var(--size-8);
  }

  &:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  &:hover,
  &:focus {
    border-color: var(--color-gray);
  }
`;

export const ReadOnlyInput = styled(Input).attrs({
  readOnly: true,
})`
  background-color: var(--color-light-gray);
  border-color: var(--color-light-gray);
  cursor: default;

  &:hover,
  &:focus {
    border-color: var(--color-light-gray);
  }
`;

export const TransparentInput = styled.input`
  cursor: pointer;
  height: 100%;
  left: 0;
  margin: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;

  /* prettier-ignore */
  &:focus + ${/* sc-selector */ CheckboxIcon},
  &:focus + ${/* sc-selector */ CheckboxSelectedIcon},
  &:focus + ${/* sc-selector */ RadioButtonIcon},
  &:focus + ${/* sc-selector */ RadioButtonSelectedIcon} {
    @supports (-moz-appearance: none) {
      outline: 1px dotted ButtonText;
    }

    @supports (-webkit-appearance: none) {
      outline: 5px auto -webkit-focus-ring-color;
    }
  }
`;

export const TextArea = styled(Input).attrs({
  as: "textarea",
  rows: 7,
})`
  font-family: ${({ code }) => code && "var(--font-system-monospace)"};
  font-size: ${({ code }) => code && "var(--size-12)"};
  max-width: 100%;
  min-width: 100%;
  resize: vertical;
`;

export const Divider = styled.hr`
  background-color: var(--color-medium-gray);
  border: none;
  height: 1px;
  margin: 0 calc(-1 * var(--size-24)) var(--size-16);

  ${/* sc-selector */ Label} + & {
    margin-top: var(--size-20);
  }
`;

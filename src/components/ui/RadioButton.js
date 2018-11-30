import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { RadioButtonIcon, RadioButtonSelectedIcon } from "./Icons";

const Field = styled.input`
  cursor: pointer;
  height: 100%;
  left: 0;
  margin: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const Icon = styled.svg`
  margin-left: calc(-1 * var(--size-2));
  margin-right: var(--size-8);
  vertical-align: -25%;

  ${/* sc-selector */ Field}:focus + & {
    @supports (-moz-appearance: none) {
      outline: 1px dotted ButtonText;
    }

    @supports (-webkit-appearance: none) {
      outline: 5px auto -webkit-focus-ring-color;
    }
  }
`;

export default function RadioButton({ checked, disabled, id, name, onChange }) {
  return (
    <React.Fragment>
      <Field
        type="radio"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        name={name}
      />
      <Icon
        as={checked ? RadioButtonSelectedIcon : RadioButtonIcon}
        aria-hidden
      />
    </React.Fragment>
  );
}

RadioButton.propTypes = {
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

RadioButton.defaultProps = {
  disabled: false,
};

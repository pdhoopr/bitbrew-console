import PropTypes from "prop-types";
import React from "react";
import { TransparentInput } from "./Forms";
import { RadioButtonIcon, RadioButtonSelectedIcon } from "./Icons";

export default function RadioButton({ checked, disabled, id, name, onChange }) {
  return (
    <React.Fragment>
      <TransparentInput
        type="radio"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        name={name}
      />
      {checked ? (
        <RadioButtonSelectedIcon aria-hidden />
      ) : (
        <RadioButtonIcon aria-hidden />
      )}
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

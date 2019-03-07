import PropTypes from "prop-types";
import React from "react";
import RadioButtonCheckedIcon from "../icons/RadioButtonCheckedIcon";
import RadioButtonIcon from "../icons/RadioButtonIcon";
import ChoiceIcon from "./ChoiceIcon";
import ChoiceInput from "./ChoiceInput";
import ChoiceLabel from "./ChoiceLabel";

export default function RadioField({ checked, id, label, name, onChange }) {
  return (
    <ChoiceLabel htmlFor={id}>
      <ChoiceInput
        type="radio"
        name={name}
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <ChoiceIcon
        as={checked ? RadioButtonCheckedIcon : RadioButtonIcon}
        aria-hidden
      />
      {label}
    </ChoiceLabel>
  );
}

RadioField.propTypes = {
  checked: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

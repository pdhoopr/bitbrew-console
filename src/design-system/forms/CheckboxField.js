import PropTypes from "prop-types";
import React from "react";
import CheckboxCheckedIcon from "../icons/CheckboxCheckedIcon";
import CheckboxIcon from "../icons/CheckboxIcon";
import ChoiceIcon from "./ChoiceIcon";
import ChoiceInput from "./ChoiceInput";
import ChoiceLabel from "./ChoiceLabel";

export default function CheckboxField({ checked, id, label, onChange }) {
  return (
    <ChoiceLabel htmlFor={id}>
      <ChoiceInput
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <ChoiceIcon
        as={checked ? CheckboxCheckedIcon : CheckboxIcon}
        aria-hidden
      />
      {label}
    </ChoiceLabel>
  );
}

CheckboxField.propTypes = {
  checked: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

import PropTypes from "prop-types";
import React from "react";
import { TransparentInput } from "./Forms";
import { CheckboxIcon, CheckboxSelectedIcon } from "./Icons";

export default function Checkbox({ checked, id, onChange }) {
  return (
    <React.Fragment>
      <TransparentInput
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      {checked ? (
        <CheckboxSelectedIcon aria-hidden />
      ) : (
        <CheckboxIcon aria-hidden />
      )}
    </React.Fragment>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

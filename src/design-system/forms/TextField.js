import PropTypes from "prop-types";
import React from "react";
import Input from "./Input";
import Label from "./Label";

export default function TextField({ id, label, onChange, placeholder, value }) {
  return (
    <Label htmlFor={id}>
      {label}
      <Input
        type="text"
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        readOnly={!onChange}
      />
    </Label>
  );
}

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
};

TextField.defaultProps = {
  onChange: null,
  placeholder: null,
};

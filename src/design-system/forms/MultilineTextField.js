import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Input from "./Input";
import Label from "./Label";

const TextArea = styled(Input)`
  font-family: ${({ monospace }) =>
    monospace && "var(--font-system-monospace)"};
  font-size: ${({ monospace }) => monospace && "var(--size-12)"};
  max-width: 100%;
  min-width: 100%;
  resize: vertical;
`;

export default function MultilineTextField({
  id,
  label,
  monospace,
  onChange,
  value,
}) {
  return (
    <Label htmlFor={id}>
      {label}
      <TextArea
        as="textarea"
        id={id}
        value={value}
        onChange={onChange}
        monospace={monospace}
        rows={8}
      />
    </Label>
  );
}

MultilineTextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  monospace: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

MultilineTextField.defaultProps = {
  monospace: false,
};

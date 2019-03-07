import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Input from "./Input";
import Label from "./Label";

const MultilineInput = styled(Input)`
  font-family: ${({ monospace }) =>
    monospace && "var(--font-system-monospace)"};
  font-size: ${({ monospace }) => monospace && "var(--size-12)"};
  line-height: ${({ monospace }) => monospace && "var(--size-16)"};
  max-width: 100%;
  min-width: 100%;
  resize: vertical;
`;

export default function TextField({
  id,
  isMultiline,
  label,
  monospace,
  onChange,
  placeholder,
  value,
}) {
  const inputProps = {
    id,
    value,
    onChange,
    placeholder,
    readOnly: !onChange,
  };
  return (
    <Label htmlFor={id}>
      {label}
      {isMultiline ? (
        <MultilineInput
          as="textarea"
          rows={monospace ? 9 : 7}
          monospace={monospace}
          {...inputProps}
        />
      ) : (
        <Input type="text" {...inputProps} />
      )}
    </Label>
  );
}

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  isMultiline: PropTypes.bool,
  label: PropTypes.string.isRequired,
  monospace: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
};

TextField.defaultProps = {
  isMultiline: false,
  monospace: false,
  onChange: null,
  placeholder: null,
};

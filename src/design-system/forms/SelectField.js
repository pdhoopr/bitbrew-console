import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import DropdownIcon from "../icons/DropdownIcon";
import Input from "./Input";
import Label from "./Label";

const Options = styled(Input)`
  appearance: none;
  background: none;
  cursor: pointer;
  padding-right: var(--size-44);
  text-transform: none;

  &:-moz-focusring {
    color: transparent;
  }
`;

const Icon = styled(DropdownIcon)`
  bottom: var(--size-24);
  pointer-events: none;
  position: absolute;
  right: var(--size-36);
  z-index: 1;
`;

export default function SelectField({ children, id, label, onChange, value }) {
  return (
    <Label htmlFor={id}>
      {label}
      <Options as="select" id={id} value={value} onChange={onChange}>
        {!value && <option disabled value="" />}
        {children}
      </Options>
      <Icon aria-hidden />
    </Label>
  );
}

SelectField.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

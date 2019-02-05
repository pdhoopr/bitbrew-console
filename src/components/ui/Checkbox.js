import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { CheckboxIcon, CheckboxSelectedIcon } from "./Icons";

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
      outline: var(--outline-moz);
    }

    @supports (-webkit-appearance: none) {
      outline: var(--outline-webkit);
    }
  }
`;

export default function Checkbox({ checked, id, onChange }) {
  return (
    <React.Fragment>
      <Field type="checkbox" id={id} checked={checked} onChange={onChange} />
      <Icon as={checked ? CheckboxSelectedIcon : CheckboxIcon} aria-hidden />
    </React.Fragment>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

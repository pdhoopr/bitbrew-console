import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { Input } from "./Forms";
import { ArrowDownIcon } from "./Icons";

const Wrapper = styled.div`
  position: relative;
`;

const Field = styled(Input)`
  appearance: none;
  background: none;
  cursor: pointer;
  padding-right: var(--size-44);
  text-transform: none;

  &:-moz-focusring {
    color: transparent;
  }
`;

const Icon = styled(ArrowDownIcon)`
  pointer-events: none;
  position: absolute;
  right: var(--size-12);
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`;

export default function Select({ children, id, onChange, value }) {
  return (
    <Wrapper>
      <Field as="select" id={id} value={value} onChange={onChange}>
        {!value && <option disabled value="" />}
        {children}
      </Field>
      <Icon aria-hidden />
    </Wrapper>
  );
}

Select.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

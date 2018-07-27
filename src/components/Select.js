import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Input } from './Forms';
import { DropdownIcon } from './Icons';

const Wrapper = styled.div`
  position: relative;
`;

const Field = styled(Input.withComponent('select'))`
  appearance: none;
  background: none;
  cursor: pointer;
  padding-right: var(--size-44);
`;

const Icon = styled(DropdownIcon)`
  pointer-events: none;
  position: absolute;
  right: var(--size-12);
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`;

function Select({ children, id, onChange, value }) {
  return (
    <Wrapper>
      <Field id={id} value={value} onChange={onChange}>
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

export default observer(Select);

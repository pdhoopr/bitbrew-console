import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import Card from './Card';

function FormImpl(props) {
  return <form noValidate {...props} />;
}

const ReactiveForm = observer(FormImpl);

export const Form = styled(Card.withComponent(ReactiveForm))`
  padding: var(--size-16) var(--size-24);
`;

export const Label = styled.label`
  display: block;
  font-weight: var(--weight-bold);
  margin-bottom: var(--size-16);
`;

export const Input = styled.input.attrs({
  type: 'text',
})`
  border: 1px solid var(--color-medium-gray);
  border-radius: var(--corner-radius);
  color: var(--color-black);
  display: block;
  font-family: var(--font-roboto);
  font-size: var(--size-14);
  line-height: var(--size-20);
  padding: var(--size-7) var(--size-16);
  transition: border-color var(--duration-short);
  width: 100%;

  &::placeholder {
    color: var(--color-dark-gray);
  }

  ${/* sc-selector */ Label} & {
    margin-top: var(--size-8);
  }

  &:hover,
  &:focus {
    border-color: var(--color-gray);
  }
`;

export const ReadOnlyInput = styled(Input).attrs({
  readOnly: true,
})`
  background-color: var(--color-light-gray);
  border-color: var(--color-light-gray);
  cursor: default;

  &:hover,
  &:focus {
    border-color: var(--color-light-gray);
  }
`;

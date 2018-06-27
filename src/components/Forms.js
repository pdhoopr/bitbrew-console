import React from 'react';
import styled from 'styled-components';
import Card from './Card';

function FormImpl(props) {
  return <form noValidate {...props} />;
}

export const Form = styled(Card.withComponent(FormImpl))`
  padding: var(--size-16) var(--size-24);
`;

export const Label = styled.label`
  display: block;
  font-weight: var(--weight-bold);
  margin-bottom: var(--size-16);
`;

export const Input = styled.input`
  border: 1px solid var(--color-medium-gray);
  border-radius: var(--corner-radius);
  color: var(--color-black);
  display: block;
  font-family: var(--font-roboto);
  font-size: var(--size-14);
  line-height: var(--size-20);
  padding: var(--size-7) var(--size-16);
  width: 100%;

  &::placeholder {
    color: var(--color-dark-gray);
  }

  ${/* sc-selector */ Label} & {
    margin-top: var(--size-8);
  }
`;

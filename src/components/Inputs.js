import styled, { css } from 'styled-components';

export const Label = styled.label`
  display: block;
  font-weight: var(--weight-bold);
  margin-bottom: var(--size-16);
`;

export const baseStyles = css`
  border-radius: var(--corner-radius);
  color: var(--color-black);
  display: block;
  font-family: var(--font-roboto);
  font-size: var(--size-14);
  line-height: var(--size-20);
  width: 100%;

  &::placeholder {
    color: var(--color-dark-grey);
  }
`;

export const Input = styled.input`
  ${baseStyles};
  border: 1px solid var(--color-medium-grey);
  padding: var(--size-7) var(--size-16);

  ${/* sc-selector */ Label} & {
    margin-top: var(--size-8);
  }
`;

export const RaisedInput = styled.input`
  ${baseStyles};
  border: none;
  box-shadow: var(--elevation-low);
  padding: var(--size-8) var(--size-16);
`;

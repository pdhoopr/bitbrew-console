import styled, { css } from 'styled-components';

export const baseStyles = css`
  background: none;
  border: none;
  border-radius: var(--corner-radius);
  cursor: pointer;
  font-family: var(--font-roboto);
  font-size: var(--size-14);
  font-weight: var(--weight-bold);
  line-height: var(--size-20);
  padding: var(--size-8) var(--size-16);
  text-transform: uppercase;
  transition: opacity var(--duration-short);

  &:hover {
    opacity: 0.8;
  }
`;

export const RaisedButton = styled.button`
  ${baseStyles};
  color: var(--color-white);
  background-color: var(--color-green);
  box-shadow: var(--elevation-low);
`;

export const TextButton = styled.button`
  ${baseStyles};
  color: inherit;
`;

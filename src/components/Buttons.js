import styled, { css } from 'styled-components';

const baseStyles = css`
  appearance: button;
  background: none;
  border: none;
  border-radius: var(--corner-radius);
  cursor: pointer;
  font-family: var(--font-roboto);
  font-size: var(--size-14);
  font-weight: var(--weight-bold);
  line-height: var(--size-20);
  margin: 0;
  padding: var(--size-8) var(--size-16);
  text-transform: uppercase;

  &::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  &:-moz-focusring {
    outline: 1px dotted ButtonText;
  }
`;

export const Button = styled.button.attrs({
  type: 'button',
})`
  ${baseStyles};
  color: inherit;
  padding: var(--size-8);
  position: relative;

  &::before {
    background-color: currentColor;
    border-radius: var(--corner-radius);
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity var(--duration-short);
  }

  &:hover::before,
  &:focus::before {
    opacity: 0.08;
  }
`;

export const IconButton = styled(Button).attrs({
  'aria-label': ({ title }) => title,
})`
  &::before {
    border-radius: 50%;
  }
`;

export const RaisedButton = styled.button.attrs({
  type: 'button',
})`
  ${baseStyles};
  background-color: ${({ red }) =>
    red ? 'var(--color-red)' : 'var(--color-green)'};
  box-shadow: var(--elevation-low);
  color: var(--color-white);
  transition: opacity var(--duration-short);

  &:hover,
  &:focus {
    opacity: 0.64;
  }
`;

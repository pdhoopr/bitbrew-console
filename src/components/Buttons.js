import styled, { css } from 'styled-components';

const baseStyles = css`
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
`;

export const Button = styled.button`
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

  &:hover::before {
    opacity: 0.08;
  }
`;

export const IconButton = styled(Button).attrs({
  'aria-label': props => props.title,
})`
  &::before {
    border-radius: 50%;
  }
`;

export const RaisedButton = styled.button`
  ${baseStyles};
  background-color: ${props =>
    props.red ? 'var(--color-red)' : 'var(--color-green)'};
  box-shadow: var(--elevation-low);
  color: var(--color-white);
  transition: opacity var(--duration-short);

  &:hover {
    opacity: 0.64;
  }
`;

import styled from "styled-components";

export default styled.input.attrs({
  autoComplete: "off",
})`
  border: var(--border-divider);
  border-radius: var(--corner-radius);
  color: var(--color-black);
  display: block;
  font-family: var(--font-roboto);
  font-size: var(--size-14);
  line-height: var(--size-20);
  margin: 0;
  padding: var(--size-7) var(--size-16);
  transition: border-color var(--effect-duration);
  width: 100%;

  &:hover,
  &:focus {
    border-color: var(--color-medium-dark-gray);
  }

  &::placeholder {
    color: var(--color-dark-gray);
  }

  &:-moz-focusring {
    outline: var(--outline-moz);
  }

  &[readonly] {
    background-color: var(--color-light-gray);
    border-color: var(--color-light-gray);
    cursor: default;

    &:hover,
    &:focus {
      border-color: var(--color-light-gray);
    }
  }
`;

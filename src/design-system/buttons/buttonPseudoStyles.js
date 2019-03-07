import { css } from "styled-components";

export default css`
  position: relative;

  &::before {
    background-color: currentColor;
    border-radius: var(--corner-radius);
    bottom: 0;
    content: "";
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity var(--effect-duration);
  }

  &:hover::before,
  &:focus::before {
    opacity: 0.1;
  }

  &::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  &:-moz-focusring {
    outline: var(--outline-moz);
  }
`;

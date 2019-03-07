import { css } from "styled-components";

export default css`
  &__Body--open {
    overflow: hidden;
  }

  &__Backdrop {
    background-color: rgba(0, 0, 0, 0.4);
    bottom: 0;
    display: flex;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
  }

  &__Content {
    box-shadow: var(--elevation-high);
    max-width: var(--size-480);
    outline: none;
    overflow: auto;
    position: relative;
    width: calc(100% - var(--size-48));
  }
`;

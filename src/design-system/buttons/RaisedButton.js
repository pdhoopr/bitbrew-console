import styled from "styled-components";
import buttonStyles from "./buttonStyles";

export default styled.button.attrs({
  type: "button",
})`
  ${buttonStyles};
  background-color: var(--color-green);
  box-shadow: var(--elevation-low);
  color: var(--color-white);
  padding: var(--size-8) var(--size-16);

  &:hover::before,
  &:focus::before {
    opacity: 0.2;
  }
`;

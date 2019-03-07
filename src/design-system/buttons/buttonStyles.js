import { css } from "styled-components";
import buttonPseudoStyles from "./buttonPseudoStyles";

export default css`
  appearance: button;
  background: none;
  border: none;
  border-radius: var(--corner-radius);
  cursor: pointer;
  font-family: var(--font-roboto);
  font-size: var(--size-14);
  font-weight: var(--weight-bold);
  letter-spacing: var(--letter-spacing);
  line-height: var(--size-20);
  margin: 0;
  min-width: var(--size-72);
  ${buttonPseudoStyles};
`;

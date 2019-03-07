import styled from "styled-components";
import buttonStyles from "./buttonStyles";

export default styled.button.attrs({
  type: "button",
})`
  ${buttonStyles};
  color: inherit;
  padding: var(--size-8);
`;

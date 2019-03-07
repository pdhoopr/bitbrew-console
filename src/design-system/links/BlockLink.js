import styled from "styled-components";
import buttonPseudoStyles from "../buttons/buttonPseudoStyles";
import LinkImpl from "./LinkImpl";
import linkStyles from "./linkStyles";

export default styled(LinkImpl)`
  ${linkStyles};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: var(--size-16) var(--size-24);
  ${buttonPseudoStyles};
`;

import styled from "styled-components";
import LinkImpl from "./LinkImpl";
import linkStyles from "./linkStyles";

export default styled(LinkImpl)`
  ${linkStyles};
  border-bottom: var(--border-transparent);
  color: ${({ green }) => green && "var(--color-green)"};
  transition: border-bottom-color var(--effect-duration),
    color var(--effect-duration);

  &:hover,
  &:focus {
    border-bottom-color: currentColor;
    color: var(--color-green);
  }
`;

import styled from "styled-components";
import buttonPseudoStyles from "../buttons/buttonPseudoStyles";
import iconButtonClearfixStyles from "../buttons/iconButtonClearfixStyles";
import LinkImpl from "./LinkImpl";
import linkStyles from "./linkStyles";

export default styled(LinkImpl).attrs(({ title }) => ({
  "aria-label": title,
}))`
  ${linkStyles};
  display: inline-block;
  padding: var(--size-8);
  ${buttonPseudoStyles};
  ${iconButtonClearfixStyles};

  &::before {
    border-radius: 50%;
  }
`;

import styled from "styled-components";
import Button from "./Button";
import iconButtonClearfixStyles from "./iconButtonClearfixStyles";

export default styled(Button).attrs(({ title }) => ({
  "aria-label": title,
}))`
  min-width: 0;
  ${iconButtonClearfixStyles};

  &::before {
    border-radius: 50%;
  }
`;

import { css } from "styled-components";

export default css`
  &::after {
    clear: both;
    content: "";
    display: block;
  }

  svg {
    float: left;
  }
`;

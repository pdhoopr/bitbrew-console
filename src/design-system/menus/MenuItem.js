import styled from "styled-components";
import Button from "../buttons/Button";

export default styled(Button)`
  border-radius: 0;
  display: block;
  font-weight: var(--weight-regular);
  letter-spacing: normal;
  padding-left: var(--size-16);
  padding-right: var(--size-16);
  text-align: left;
  width: 100%;

  &::before {
    border-radius: 0;
  }
`;

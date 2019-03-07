import styled from "styled-components";
import Input from "./Input";

export default styled.label`
  display: block;
  font-weight: var(--weight-bold);
  letter-spacing: var(--letter-spacing);
  padding-bottom: var(--size-16);
  padding-left: var(--size-24);
  padding-right: var(--size-24);
  position: relative;

  ${/* sc-selector */ Input} {
    margin-top: var(--size-8);
  }
`;

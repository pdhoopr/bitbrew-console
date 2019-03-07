import styled from "styled-components";
import ChoiceIcon from "./ChoiceIcon";

export default styled.input`
  cursor: pointer;
  height: 100%;
  left: 0;
  margin: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;

  &:focus + ${/* sc-selector */ ChoiceIcon} {
    @supports (-moz-appearance: none) {
      outline: var(--outline-moz);
    }

    @supports (-webkit-appearance: none) {
      outline: var(--outline-webkit);
    }
  }
`;

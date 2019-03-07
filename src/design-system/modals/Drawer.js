import styled from "styled-components";
import ModalImpl from "./ModalImpl";
import modalStyles from "./modalStyles";

export default styled(ModalImpl)`
  ${modalStyles};

  &__Backdrop {
    justify-content: flex-end;
    z-index: 3;
  }

  &__Content {
    background: var(--color-blue-gray);
  }
`;

import styled from "styled-components";
import ModalImpl from "./ModalImpl";
import modalStyles from "./modalStyles";

export default styled(ModalImpl).attrs({
  role: "alertdialog",
})`
  ${modalStyles};

  &__Backdrop {
    align-items: center;
    justify-content: center;
    z-index: 4;
  }

  &__Content {
    background: var(--color-white);
    border-radius: var(--corner-radius);
  }
`;

import styled from "styled-components";
import ErrorSvg from "./assets/error.svg";
import iconStyles from "./iconStyles";

export default styled(ErrorSvg)`
  ${iconStyles};
  fill: var(--color-red);
`;

import styled from "styled-components";
import SyncProblemSvg from "./assets/sync-problem.svg";
import iconStyles from "./iconStyles";

export default styled(SyncProblemSvg)`
  ${iconStyles};
  fill: var(--color-red);
`;

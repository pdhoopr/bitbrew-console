import styled from "styled-components";

export default styled.tr`
  border-top: var(--border-divider);
  font-style: ${({ italic }) => italic && "italic"};
`;

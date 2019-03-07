import styled from "styled-components";

export default styled.td`
  color: ${({ gray }) => gray && "var(--color-dark-gray)"};
  padding: var(--size-16) var(--size-24);
  text-align: left;
`;

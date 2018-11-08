import styled, { css } from "styled-components";

const baseStyles = css`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

export const Width320 = styled.div`
  ${baseStyles};
  max-width: var(--size-320);
`;

export const Width640 = styled.div`
  ${baseStyles};
  max-width: var(--size-640);
`;

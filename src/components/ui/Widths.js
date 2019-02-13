import styled, { css } from "styled-components";

const baseStyles = css`
  margin-left: auto;
  margin-right: auto;
  position: relative;
  width: calc(100% - var(--size-48));
`;

export const Width320 = styled.div`
  ${baseStyles};
  max-width: var(--size-320);
`;

export const Width800 = styled.div`
  ${baseStyles};
  max-width: var(--size-800);
`;

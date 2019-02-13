import styled, { css } from "styled-components";

const baseStyles = css`
  align-items: center;
  display: flex;

  > :not(:last-child) {
    margin-right: ${({ gap }) => gap && "var(--size-16)"};
  }
`;

export const FlexBetween = styled.div`
  ${baseStyles};
  justify-content: space-between;
`;

export const FlexCenter = styled.div`
  ${baseStyles};
  justify-content: center;
`;

export const FlexEnd = styled.div`
  ${baseStyles};
  justify-content: flex-end;
`;

export const FlexStart = styled.div`
  ${baseStyles};
  justify-content: flex-start;
`;

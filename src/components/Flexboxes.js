import styled, { css } from 'styled-components';

const baseStyles = css`
  align-items: center;
  display: flex;
`;

export const FlexBetween = styled.div`
  ${baseStyles};
  justify-content: space-between;
`;

export const FlexEnd = styled.div`
  ${baseStyles};
  justify-content: flex-end;
`;

export const FlexStart = styled.div`
  ${baseStyles};
  justify-content: flex-start;
`;

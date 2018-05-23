import styled, { css } from 'styled-components';

export const baseStyles = css`
  margin-bottom: 0;
  margin-top: 0;
`;

export const PageTitle = styled.h1`
  ${baseStyles};
  font-size: var(--size-32);
  font-weight: var(--weight-regular);
  line-height: var(--size-40);
`;

export const SectionTitle = styled.h2`
  ${baseStyles};
  font-size: var(--size-24);
  font-weight: var(--weight-regular);
  line-height: var(--size-32);
`;

export const ContentTitle = styled.h3`
  ${baseStyles};
  font-size: var(--size-20);
  font-weight: var(--weight-regular);
  line-height: var(--size-28);
`;

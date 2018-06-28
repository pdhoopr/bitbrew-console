import styled, { css } from 'styled-components';

const baseStyles = css`
  font-weight: var(--weight-regular);
  margin-bottom: 0;
  margin-top: 0;
`;

export const PageTitle = styled.h1`
  ${baseStyles};
  font-size: var(--size-32);
  line-height: var(--size-40);
`;

export const SectionTitle = styled.h2`
  ${baseStyles};
  font-size: var(--size-24);
  line-height: var(--size-32);
`;

export const ContentTitle = styled.h3`
  ${baseStyles};
  font-size: var(--size-20);
  line-height: var(--size-28);
`;

export const Subtitle = styled.h4`
  ${baseStyles};
  color: ${({ gray }) => (gray ? 'var(--color-dark-gray)' : 'inherit')};
  font-size: var(--size-16);
  line-height: var(--size-24);
`;

export const Text = styled.p`
  ${baseStyles};
  color: ${({ gray }) => (gray ? 'var(--color-dark-gray)' : 'inherit')};
  font-size: var(--size-14);
  line-height: var(--size-20);
`;
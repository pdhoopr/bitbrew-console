import styled, { css } from "styled-components";

const baseStyles = css`
  color: ${({ gray }) => gray && "var(--color-dark-gray)"};
  font-weight: var(--weight-regular);
  margin-bottom: 0;
  margin-top: 0;
`;

export const PageHeading = styled.h1`
  ${baseStyles};
  font-size: var(--size-32);
  line-height: var(--size-40);
`;

export const SectionHeading = styled.h2`
  ${baseStyles};
  font-size: var(--size-24);
  line-height: var(--size-32);
`;

export const ContentHeading = styled.h3`
  ${baseStyles};
  font-size: var(--size-20);
  line-height: var(--size-28);
`;

export const SubHeading = styled.h4`
  ${baseStyles};
  font-size: var(--size-16);
  line-height: var(--size-24);
`;

export const Text = styled.p`
  ${baseStyles};
  font-weight: ${({ as }) => as === "strong" && "var(--weight-bold)"};
  font-size: var(--size-14);
  line-height: var(--size-20);
`;

export const Caption = styled.p`
  ${baseStyles};
  font-size: var(--size-12);
  line-height: var(--size-16);
`;

import styled from 'styled-components';

export const Section = styled.section`
  &:not(:first-of-type) {
    margin-top: var(--size-32);
  }
`;

export const Content = styled.div`
  background-color: var(--color-white);
  border-radius: var(--corner-radius);
  box-shadow: var(--elevation-low);
  margin-top: var(--size-16);
`;

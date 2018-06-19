import styled from 'styled-components';
import Card from './Card';

export const Section = styled.section`
  &:not(:first-of-type) {
    margin-top: var(--size-32);
  }
`;

export const Content = styled(Card.withComponent('section'))`
  margin-top: var(--size-16);
`;

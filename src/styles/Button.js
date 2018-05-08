import styled from 'styled-components';

export default styled.button`
  background: none;
  background-color: var(--color-white);
  border: none;
  border-radius: var(--corner-radius);
  box-shadow: var(--elevation-low);
  color: var(--color-black);
  cursor: pointer;
  font-family: var(--font-roboto);
  font-size: var(--size-14);
  font-weight: var(--weight-bold);
  line-height: var(--size-20);
  padding: var(--size-8) var(--size-16);
  text-transform: uppercase;
  transition: opacity var(--duration-short);

  &:hover {
    opacity: 0.8;
  }
`;

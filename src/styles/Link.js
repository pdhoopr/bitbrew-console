import styled from 'styled-components';

export default styled.a`
  border-bottom: 1px solid transparent;
  color: var(--color-green);
  cursor: pointer;
  text-decoration: none;
  transition: border-bottom-color var(--duration-short),
    color var(--duration-short);

  &:hover {
    border-bottom-color: currentColor;
  }
`;

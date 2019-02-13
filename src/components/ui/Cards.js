import styled from "styled-components";
import { Link } from "./Links";

export const Card = styled.div`
  background-color: var(--color-white);
  border-radius: var(--corner-radius);
  box-shadow: var(--elevation-low);
  flex: 1;
  margin-top: 0;
`;

export const CardLink = styled(Link)`
  border-bottom: none;
  display: block;
  height: 100%;
  padding: var(--size-16) var(--size-24);
  transition: background-color var(--duration-short);

  &:hover,
  &:focus {
    background-color: var(--color-light-gray);
    color: inherit;
  }

  &::before {
    content: none;
  }
`;

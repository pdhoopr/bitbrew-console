import React from "react";
import styled from "styled-components";
import { Link } from "./Links";

const Wrapper = styled.footer`
  margin-bottom: var(--size-32);
  margin-top: var(--size-128);
`;

const Resources = styled.ul`
  color: var(--color-dark-gray);
  list-style-type: none;
  margin-bottom: 0;
  margin-top: 0;
  padding-left: 0;
  text-align: center;
`;

const Item = styled.li`
  display: inline-block;

  &:not(:last-of-type) {
    margin-right: var(--size-16);
  }
`;

export default function Footer() {
  return (
    <Wrapper>
      <Resources>
        <Item>&copy; 2018 BitBrew, Inc.</Item>
        <Item>
          <Link to="https://help.bitbrew.com/">Help</Link>
        </Item>
        <Item>
          <Link to="http://docs.hub.bitbrew.com/reference">Reference</Link>
        </Item>
      </Resources>
    </Wrapper>
  );
}

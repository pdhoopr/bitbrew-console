import React from 'react';
import styled from 'styled-components';
import { Link } from './Links';

const Wrapper = styled.footer`
  margin-bottom: var(--size-32);
  margin-top: var(--size-128);
`;

const List = styled.ul`
  color: var(--color-dark-gray);
  list-style-type: none;
  margin-bottom: 0;
  margin-top: 0;
  padding-left: 0;
  text-align: center;
`;

const ListItem = styled.li`
  display: inline-block;

  &:not(:last-of-type) {
    margin-right: var(--size-16);
  }
`;

export default function Footer() {
  return (
    <Wrapper>
      <List>
        <ListItem>&copy; 2018 BitBrew, Inc.</ListItem>
        <ListItem>
          <Link to="http://docs.hub.bitbrew.com/v1.3/reference#authentication">
            API Documentation
          </Link>
        </ListItem>
        <ListItem>
          <Link to="http://docs.hub.bitbrew.com/v1.3/reference">
            Event Catalog
          </Link>
        </ListItem>
        <ListItem>
          <Link to="https://help.bitbrew.com/">Help</Link>
        </ListItem>
      </List>
    </Wrapper>
  );
}

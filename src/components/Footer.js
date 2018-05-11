import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import Link from '../styles/Link';

const Wrapper = styled.footer`
  margin-bottom: var(--size-32);
  margin-top: var(--size-128);
`;

const List = styled.ul`
  color: var(--color-dark-grey);
  list-style-type: none;
  margin-bottom: 0;
  margin-top: 0;
  padding-left: 0;
  text-align: center;
`;

const ListItem = styled.li`
  display: inline-block;

  &:not(:last-of-type) {
    margin-right: var(--size-24);
  }
`;

function Footer() {
  return (
    <Wrapper>
      <List>
        <ListItem>&copy; 2018 BitBrew, Inc.</ListItem>
        <ListItem>
          <Link
            href="http://docs.hub.bitbrew.com/v1.3/reference#authentication"
            rel="noopener noreferrer"
            target="_blank"
          >
            API Documentation
          </Link>
        </ListItem>
        <ListItem>
          <Link
            href="http://docs.hub.bitbrew.com/v1.3/reference"
            rel="noopener
            noreferrer"
            target="_blank"
          >
            Event Catalog
          </Link>
        </ListItem>
        <ListItem>
          <Link
            href="https://help.bitbrew.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Help
          </Link>
        </ListItem>
      </List>
    </Wrapper>
  );
}

export default observer(Footer);

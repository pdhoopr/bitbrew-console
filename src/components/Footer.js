import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import Link from '../styles/Link';

const Element = styled.footer`
  margin-bottom: var(--size-32);
  margin-top: var(--size-128);
`;

const List = styled.ul`
  color: var(--color-dark-grey);
  font-size: var(--size-12);
  line-height: var(--size-16);
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

const FooterLink = Link.extend`
  color: var(--color-dark-grey);

  &:hover {
    color: var(--color-green);
  }
`;

function Footer() {
  return (
    <Element>
      <List>
        <ListItem>&copy; 2018 BitBrew, Inc.</ListItem>
        <ListItem>
          <FooterLink
            href="http://docs.hub.bitbrew.com/v1.3/reference#authentication"
            rel="noopener noreferrer"
            target="_blank"
          >
            API Documentation
          </FooterLink>
        </ListItem>
        <ListItem>
          <FooterLink
            href="http://docs.hub.bitbrew.com/v1.3/reference"
            rel="noopener
            noreferrer"
            target="_blank"
          >
            Event Catalog
          </FooterLink>
        </ListItem>
        <ListItem>
          <FooterLink
            href="https://help.bitbrew.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Help
          </FooterLink>
        </ListItem>
      </List>
    </Element>
  );
}

export default observer(Footer);

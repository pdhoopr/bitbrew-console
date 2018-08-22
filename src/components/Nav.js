import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { rootPath } from '../utils/urls';
import { FlexCenter } from './Flexboxes';
import { IconLink, NavLink } from './Links';
import Logo from './Logo';
import { Caption } from './Texts';

const Wrapper = styled.nav`
  background-color: var(--color-black);
  bottom: 0;
  color: var(--color-white);
  left: 0;
  overflow-y: auto;
  padding-bottom: var(--size-32);
  padding-top: var(--size-24);
  position: fixed;
  top: 0;
  width: var(--size-240);
`;

const OrgsAndProjectsLink = styled(IconLink)`
  padding-left: var(--size-14);
  padding-right: var(--size-14);
`;

const Heading = styled(Caption)`
  color: var(--color-gray);
  font-weight: var(--weight-bold);
  margin-bottom: var(--size-8);
  margin-top: var(--size-24);
  padding-left: var(--size-24);
  padding-right: var(--size-24);
  text-transform: uppercase;
`;

const List = styled.ul`
  list-style-type: none;
  margin-bottom: 0;
  margin-top: 0;
  padding-left: 0;
`;

class Nav extends React.Component {
  componentDidMount() {
    document.getElementById('root').classList.add('has-nav');
  }

  componentWillUnmount() {
    document.getElementById('root').classList.remove('has-nav');
  }

  render() {
    const { heading, links } = this.props;
    return (
      <Wrapper aria-label={heading}>
        <FlexCenter>
          <OrgsAndProjectsLink
            to={rootPath}
            title="View all organizations and projects"
          >
            <Logo />
          </OrgsAndProjectsLink>
        </FlexCenter>
        <Heading>{heading}</Heading>
        <List>
          {links.map(link => (
            <li key={link.to}>
              <NavLink to={link.to}>{link.text}</NavLink>
            </li>
          ))}
        </List>
      </Wrapper>
    );
  }
}

Nav.propTypes = {
  heading: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default observer(Nav);

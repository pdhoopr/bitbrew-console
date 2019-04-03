import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import styled from "styled-components";
import {
  BlockLink,
  Heading3,
  IconLink,
  LogoIcon,
  Menu,
  MenuItem,
} from "../../design-system";
import AppContext from "../AppContext";
import Name from "./Name";

const Wrapper = styled.header`
  background-color: var(--color-black);
  box-shadow: var(--elevation-low);
  color: var(--color-white);
  position: relative;
`;

const Actions = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-bottom: var(--size-8);
  padding-left: var(--size-10);
  padding-right: var(--size-16);
  padding-top: var(--size-8);
`;

const WelcomeLink = styled(IconLink)`
  padding-left: var(--size-14);
  padding-right: var(--size-12);

  &[data-active] ${/* sc-selector */ LogoIcon} {
    fill: var(--color-green);
  }

  &[data-current] {
    cursor: default;

    &::before {
      content: none;
    }
  }
`;

const Breadcrumbs = styled.ul`
  display: flex;
  list-style-type: none;
  margin-bottom: 0;
  margin-right: auto;
  margin-top: 0;
  padding-left: var(--size-12);
  padding-top: var(--size-8);
`;

const BreadcrumbHeading = styled(Heading3)`
  &:not(:first-of-type)::before {
    content: "/";
    padding-left: var(--size-8);
    padding-right: var(--size-8);
  }

  &:last-of-type {
    font-weight: var(--weight-bold);
    letter-spacing: var(--letter-spacing);
  }
`;

const BreadcrumbLink = styled(BlockLink)`
  display: inline-block;
  padding: var(--size-4) var(--size-8);

  &[data-current] {
    cursor: default;

    &::before {
      content: none;
    }
  }
`;

const UnnamedBreadcrumb = styled(Name)`
  color: var(--color-medium-dark-gray);
`;

function getCurrentAttributes({ isCurrent }) {
  return isCurrent
    ? {
        "data-active": "",
        "data-current": "",
      }
    : null;
}

function loseFocus(event) {
  event.currentTarget.blur();
}

export default function Header({ breadcrumbs, children }) {
  const { auth, logOut } = useContext(AppContext);

  return (
    <Wrapper>
      <Actions>
        <WelcomeLink
          to="/"
          title="Go to welcome screen"
          getProps={getCurrentAttributes}
        >
          <LogoIcon />
        </WelcomeLink>
        {breadcrumbs && (
          <Breadcrumbs>
            {breadcrumbs.map(breadcrumb => (
              <BreadcrumbHeading as="li" key={breadcrumb.resource.id}>
                <BreadcrumbLink
                  getProps={getCurrentAttributes}
                  to={breadcrumb.to}
                  onClick={loseFocus}
                >
                  <UnnamedBreadcrumb resource={breadcrumb.resource} />
                </BreadcrumbLink>
              </BreadcrumbHeading>
            ))}
          </Breadcrumbs>
        )}
        <Menu heading={jwtDecode(auth).email}>
          <MenuItem onClick={logOut}>Log out</MenuItem>
        </Menu>
      </Actions>
      {children}
    </Wrapper>
  );
}

Header.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      resource: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
      to: PropTypes.string.isRequired,
    }),
  ),
  children: PropTypes.node,
};

Header.defaultProps = {
  breadcrumbs: null,
  children: null,
};

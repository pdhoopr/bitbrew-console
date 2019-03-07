import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import styled from "styled-components";
import {
  Heading3,
  IconLink,
  LogoIcon,
  Menu,
  MenuItem,
} from "../../design-system";
import GlobalContext from "../GlobalContext";
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

const Heading = styled(Heading3)`
  margin-right: auto;
  padding-left: var(--size-12);
  padding-top: var(--size-8);
`;

const MaybeUnnamed = styled(Name)`
  color: var(--color-medium-dark-gray);
`;

export default function Header({ children, isLoading, resource }) {
  const { auth, logOut } = useContext(GlobalContext);

  return (
    <Wrapper>
      <Actions>
        <WelcomeLink
          to="/"
          title="Go to welcome page"
          getProps={({ isCurrent }) =>
            isCurrent
              ? {
                  "data-active": "",
                  "data-current": "",
                }
              : null
          }
        >
          <LogoIcon />
        </WelcomeLink>
        {!isLoading && resource && (
          <Heading as="p">
            <MaybeUnnamed resource={resource} />
          </Heading>
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
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  resource: PropTypes.object,
};

Header.defaultProps = {
  children: null,
  isLoading: false,
  resource: null,
};

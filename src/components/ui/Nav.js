import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import styled from "styled-components";
import GlobalContext from "../GlobalContext";
import { Button } from "./Buttons";
import { FlexBetween, FlexStart } from "./Flexboxes";
import { ArrowDownInlineIcon, LogoIcon } from "./Icons";
import { IconLink } from "./Links";
import Menu from "./Menu";
import { ContentHeading } from "./Texts";

const Wrapper = styled.nav`
  background-color: var(--color-black);
  box-shadow: ${({ flat }) => !flat && "var(--elevation-low)"};
  color: var(--color-white);
  position: relative;
`;

const Menus = styled(FlexBetween)`
  padding-bottom: var(--size-8);
  padding-left: var(--size-10);
  padding-right: var(--size-16);
  padding-top: var(--size-8);
`;

const Heading = styled(ContentHeading)`
  margin-left: var(--size-12);
  margin-right: auto;
  margin-top: var(--size-8);
`;

const Links = styled(FlexStart)`
  list-style-type: none;
  margin-bottom: 0;
  margin-top: 0;
  padding-left: 0;
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

export default function Nav({ children, flat, heading, isLoading }) {
  const { auth, logOut } = useContext(GlobalContext);

  return (
    <Wrapper flat={flat}>
      <Menus>
        <WelcomeLink
          to="/"
          title="Back to welcome page"
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
        {!isLoading && <Heading as="span">{heading}</Heading>}
        <Menu
          control={
            <Button>
              {jwtDecode(auth).email} <ArrowDownInlineIcon />
            </Button>
          }
        >
          <Button onClick={logOut}>Log out</Button>
        </Menu>
      </Menus>
      {children && (
        <Links as="ul">
          {React.Children.map(children, navLink => (
            <li>{navLink}</li>
          ))}
        </Links>
      )}
    </Wrapper>
  );
}

Nav.propTypes = {
  children: PropTypes.node,
  flat: PropTypes.bool,
  heading: PropTypes.node,
  isLoading: PropTypes.bool,
};

Nav.defaultProps = {
  children: null,
  flat: false,
  heading: null,
  isLoading: false,
};

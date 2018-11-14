import PropTypes from "prop-types";
import React, { useLayoutEffect } from "react";
import styled from "styled-components";
import { FlexCenter } from "./Flexboxes";
import { IconLink } from "./Links";
import Logo from "./Logo";
import { Caption } from "./Texts";

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
  letter-spacing: var(--letter-spacing);
  margin-bottom: var(--size-8);
  margin-top: var(--size-24);
  padding-left: var(--size-24);
  padding-right: var(--size-24);
  text-transform: uppercase;
`;

const Links = styled.ul`
  list-style-type: none;
  margin-bottom: 0;
  margin-top: 0;
  padding-left: 0;
`;

export default function Nav({ children, heading }) {
  useLayoutEffect(() => {
    document.getElementById("app").dataset.nav = "";
    return () => {
      delete document.getElementById("app").dataset.nav;
    };
  });

  return (
    <Wrapper aria-label={heading}>
      <FlexCenter>
        <OrgsAndProjectsLink to="/" title="View all organizations and projects">
          <Logo />
        </OrgsAndProjectsLink>
      </FlexCenter>
      <Heading>{heading}</Heading>
      <Links>
        {React.Children.map(children, navLink => (
          <li>{navLink}</li>
        ))}
      </Links>
    </Wrapper>
  );
}

Nav.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
};

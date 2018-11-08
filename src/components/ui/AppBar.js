import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import styled from "styled-components";
import Context from "../Context";
import { Button } from "./Buttons";
import { FlexBetween } from "./Flexboxes";
import { ArrowDownIcon } from "./Icons";
import Menu from "./Menu";

const ControlButton = styled(Button)`
  text-transform: none;
`;

const ControlIcon = styled(ArrowDownIcon)`
  fill: currentColor;
  height: var(--size-16);
  margin-right: calc(-1 * var(--size-4));
  width: var(--size-16);
`;

export default function AppBar({ children }) {
  const { auth, signOut } = useContext(Context);

  return (
    <FlexBetween>
      {children}
      <Menu
        control={
          <ControlButton>
            {jwtDecode(auth).email} <ControlIcon aria-hidden />
          </ControlButton>
        }
      >
        <Button onClick={signOut}>Sign out</Button>
      </Menu>
    </FlexBetween>
  );
}

AppBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

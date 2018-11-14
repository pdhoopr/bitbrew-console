import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import Context from "../Context";
import { Button } from "./Buttons";
import { FlexBetween } from "./Flexboxes";
import { ArrowDownInlineIcon } from "./Icons";
import Menu from "./Menu";

export default function AppBar({ children }) {
  const { auth, signOut } = useContext(Context);

  return (
    <FlexBetween>
      {children}
      <Menu
        control={
          <Button>
            {jwtDecode(auth).email} <ArrowDownInlineIcon />
          </Button>
        }
      >
        <Button onClick={signOut}>Sign out</Button>
      </Menu>
    </FlexBetween>
  );
}

AppBar.propTypes = {
  children: PropTypes.node.isRequired,
};

import PropTypes from "prop-types";
import React, { useContext, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import GlobalContext from "../GlobalContext";
import { IconButton } from "./Buttons";
import { CloseIcon, ErrorIcon } from "./Icons";
import { Text } from "./Texts";

const Wrapper = styled.div`
  align-items: center;
  background-color: var(--color-black);
  border-radius: var(--corner-radius);
  bottom: var(--size-24);
  box-shadow: var(--elevation-medium);
  color: var(--color-white);
  display: flex;
  left: 0;
  margin-left: var(--size-24);
  margin-right: var(--size-24);
  max-width: var(--size-640);
  padding: var(--size-8) var(--size-16);
  position: fixed;
  z-index: 6;
`;

const Message = styled(Text)`
  flex: 1;
  margin-left: var(--size-8);
  margin-right: var(--size-16);
`;

const DismissIcon = styled(CloseIcon)`
  fill: var(--color-gray);
`;

export default function Banner({ children }) {
  const { closeBanner } = useContext(GlobalContext);

  const timeoutId = useRef(null);

  useEffect(() => {
    timeoutId.current = window.setTimeout(closeBanner, 5000);
    return () => {
      window.clearTimeout(timeoutId.current);
      timeoutId.current = null;
    };
  });

  const bannerElement = document.getElementById("alert-region");
  return ReactDOM.createPortal(
    <Wrapper>
      <ErrorIcon aria-hidden />
      <Message>{children}</Message>
      <IconButton onClick={closeBanner} title="Close error banner">
        <DismissIcon />
      </IconButton>
    </Wrapper>,
    bannerElement,
  );
}

Banner.propTypes = {
  children: PropTypes.node.isRequired,
};

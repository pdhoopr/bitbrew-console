import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import IconButton from "../buttons/IconButton";
import CheckIcon from "../icons/CheckIcon";
import CloseIcon from "../icons/CloseIcon";
import ErrorIcon from "../icons/ErrorIcon";
import Text from "../typography/Text";

const Wrapper = styled.div`
  align-items: center;
  background-color: var(--color-black);
  border-radius: var(--corner-radius);
  bottom: var(--size-24);
  box-shadow: var(--elevation-medium);
  color: var(--color-white);
  display: flex;
  margin-left: var(--size-24);
  margin-right: var(--size-24);
  max-width: var(--size-640);
  padding-bottom: var(--size-8);
  padding-left: var(--size-20);
  padding-right: var(--size-12);
  padding-top: var(--size-8);
  position: fixed;
  z-index: 6;
`;

const Message = styled(Text)`
  flex: 1;
  padding-left: var(--size-8);
  padding-right: var(--size-12);
`;

const DismissIcon = styled(CloseIcon)`
  fill: var(--color-medium-dark-gray);
`;

export default function Snackbar({ children, container, infoLevel, onClose }) {
  const timeoutIdRef = useRef(null);

  useEffect(() => {
    timeoutIdRef.current = window.setTimeout(onClose, 5000);
    return () => {
      window.clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    };
  });

  return ReactDOM.createPortal(
    <Wrapper>
      {infoLevel === "error" && <ErrorIcon aria-hidden />}
      {infoLevel === "success" && <CheckIcon aria-hidden />}
      <Message>{children}</Message>
      <IconButton onClick={onClose} title={`Dismiss ${infoLevel} message`}>
        <DismissIcon />
      </IconButton>
    </Wrapper>,
    container,
  );
}

Snackbar.propTypes = {
  children: PropTypes.node.isRequired,
  container: PropTypes.instanceOf(Element).isRequired,
  infoLevel: PropTypes.oneOf(["error", "success"]).isRequired,
  onClose: PropTypes.func.isRequired,
};

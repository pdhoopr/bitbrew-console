import PropTypes from "prop-types";
import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.4);
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 5;
`;

export default function FocusTrap({ label }) {
  const lastActiveElement = useRef(document.activeElement);
  const activeElement = useRef(null);

  const keepFocus = useCallback(event => {
    const isTab = event.keyCode === 9;
    const isEsc = event.keyCode === 27;
    if (isTab || isEsc) {
      event.preventDefault();
      event.stopPropagation();
    }
    activeElement.current.focus();
  }, []);

  useEffect(() => {
    document.addEventListener("click", keepFocus);
    activeElement.current.addEventListener("keydown", keepFocus);
    activeElement.current.focus();
    return () => {
      document.removeEventListener("click", keepFocus);
      activeElement.current.removeEventListener("keydown", keepFocus);
      lastActiveElement.current.focus();
    };
  });

  return <Wrapper ref={activeElement} tabIndex={-1} aria-label={label} />;
}

FocusTrap.propTypes = {
  label: PropTypes.string.isRequired,
};

import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { generateId } from "../../utils";
import Button from "../buttons/Button";
import ExpandIcon from "../icons/ExpandIcon";

const Summary = styled(Button)`
  color: var(--color-green);
  margin-bottom: var(--size-8);
  padding-left: var(--size-24);
  padding-right: var(--size-24);
  text-align: left;
  width: 100%;
`;

const Icon = styled(ExpandIcon)`
  fill: currentColor;
  margin-left: calc(-1 * var(--size-2));
  margin-right: var(--size-8);
  transform: rotate(-90deg);
  transition: transform var(--effect-duration);
  vertical-align: -25%;

  &[data-open] {
    transform: rotate(0deg);
  }
`;

export default function ExpansionPanel({ children, heading }) {
  const summaryIdRef = useRef(generateId(`${ExpansionPanel.name}__summary`));
  const detailsIdRef = useRef(generateId(`${ExpansionPanel.name}__details`));

  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Summary
        onClick={() => {
          setOpen(previousOpen => !previousOpen);
        }}
        id={summaryIdRef.current}
        aria-controls={detailsIdRef.current}
        aria-expanded={isOpen}
      >
        <Icon data-open={isOpen ? "" : null} aria-hidden />
        {heading}
      </Summary>
      <div
        hidden={!isOpen}
        id={detailsIdRef.current}
        aria-labelledby={summaryIdRef.current}
        role="region"
      >
        {children}
      </div>
    </>
  );
}

ExpansionPanel.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
};

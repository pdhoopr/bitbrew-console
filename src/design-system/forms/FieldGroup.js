import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { generateId } from "../../utils";
import Button from "../buttons/Button";
import DropdownIcon from "../icons/DropdownIcon";
import Heading3 from "../typography/Heading3";
import Fieldset from "./Fieldset";

const AccordionButton = styled(Button)`
  color: var(--color-green);
  margin-bottom: var(--size-8);
  padding-left: var(--size-24);
  padding-right: var(--size-24);
  text-align: left;
  width: 100%;
`;

const Icon = styled(DropdownIcon)`
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

const Divider = styled.hr`
  background-color: var(--color-medium-light-gray);
  border: none;
  height: var(--size-1);
  margin-bottom: var(--size-8);
  margin-top: var(--size-8);
`;

const Heading = styled(Heading3)`
  padding: var(--size-16) var(--size-24);
`;

export default function FieldGroup({ children, heading, isAccordion }) {
  const buttonId = useRef(generateId(`${FieldGroup.name}__button`));
  const fieldsId = useRef(generateId(`${FieldGroup.name}__fields`));

  const [isOpen, setOpen] = useState(false);

  return isAccordion ? (
    <>
      <AccordionButton
        onClick={() => {
          setOpen(prevOpen => !prevOpen);
        }}
        aria-controls={fieldsId.current}
        aria-expanded={isOpen}
      >
        <Icon data-open={isOpen ? "" : null} aria-hidden />
        {heading}
      </AccordionButton>
      <div
        id={fieldsId.current}
        hidden={!isOpen}
        aria-labelledby={buttonId.current}
        role="region"
      >
        {children}
      </div>
    </>
  ) : (
    <>
      <Divider />
      <Fieldset>
        <Heading as="legend">{heading}</Heading>
        {children}
      </Fieldset>
    </>
  );
}

FieldGroup.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
  isAccordion: PropTypes.bool,
};

FieldGroup.defaultProps = {
  isAccordion: false,
};

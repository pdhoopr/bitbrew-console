import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { generateId } from "../../utils";
import { Button } from "./Buttons";
import { ArrowDownInlineIcon, ArrowUpInlineIcon } from "./Icons";

const Header = styled(Button)`
  border-bottom: 1px solid transparent;
  border-radius: 0;
  color: var(--color-green);
  margin-bottom: var(--size-16);
  padding: 0;
  transition: border-bottom-color var(--duration-short);

  &:hover,
  &:focus {
    border-bottom-color: currentColor;
  }

  &::before {
    content: none;
  }

  ${/* sc-selector */ ArrowDownInlineIcon},
  ${/* sc-selector */ ArrowUpInlineIcon} {
    margin-right: 0;
  }
`;

export default function Accordion({ children, heading }) {
  const headerId = useRef(generateId(`${Accordion.name}__header`));
  const panelId = useRef(generateId(`${Accordion.name}__panel`));

  const [isOpen, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Header
        onClick={() => {
          setOpen(prevOpen => !prevOpen);
        }}
        aria-controls={panelId.current}
        aria-expanded={isOpen}
      >
        {heading} {isOpen ? <ArrowUpInlineIcon /> : <ArrowDownInlineIcon />}
      </Header>
      <div
        id={panelId.current}
        hidden={!isOpen}
        aria-labelledby={headerId.current}
        role="region"
      >
        {children}
      </div>
    </React.Fragment>
  );
}

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
};

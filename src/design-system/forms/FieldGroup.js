import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Heading3 from "../typography/Heading3";
import Fieldset from "./Fieldset";

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

export default function FieldGroup({ children, heading }) {
  return (
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
};

import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { ContentHeading } from "./Texts";

const Divider = styled.hr`
  background-color: var(--color-medium-gray);
  border: none;
  height: var(--size-1);
  margin: 0 calc(-1 * var(--size-24)) var(--size-16);
`;

const Fields = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
`;

const Heading = styled(ContentHeading)`
  margin-bottom: var(--size-16);
  padding-left: 0;
  padding-right: 0;
`;

export default function FormSection({ children, heading }) {
  return (
    <React.Fragment>
      <Divider />
      <Fields>
        <Heading as="legend">{heading}</Heading>
        {children}
      </Fields>
    </React.Fragment>
  );
}

FormSection.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
};

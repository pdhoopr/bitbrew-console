import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { Divider } from "./Forms";
import { ContentHeading } from "./Texts";

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

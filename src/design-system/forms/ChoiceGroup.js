import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import ChoiceLabel from "./ChoiceLabel";
import Fieldset from "./Fieldset";
import Label from "./Label";

const Wrapper = styled(Fieldset)`
  padding-bottom: var(--size-8);

  ${/* sc-selector */ ChoiceLabel} {
    padding-bottom: var(--size-8);
  }
`;

const Heading = styled(Label)`
  padding-bottom: var(--size-8);
`;

export default function ChoiceGroup({ children, heading }) {
  return (
    <Wrapper>
      <Heading as="legend">{heading}</Heading>
      {children}
    </Wrapper>
  );
}

ChoiceGroup.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
};

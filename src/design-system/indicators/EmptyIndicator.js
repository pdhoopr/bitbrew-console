import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import buttonPseudoStyles from "../buttons/buttonPseudoStyles";
import EmptyIcon from "../icons/EmptyIcon";
import Subheading from "../typography/Subheading";

const Wrapper = styled.div`
  border-radius: var(--corner-radius);
  color: var(--color-dark-gray);
  padding: var(--size-32) var(--size-24);
  text-align: center;
  ${buttonPseudoStyles};

  &::before {
    opacity: 0.1;
  }
`;

const Message = styled(Subheading)`
  padding-top: var(--size-8);
`;

export default function EmptyIndicator({ children }) {
  return (
    <Wrapper>
      <EmptyIcon aria-hidden />
      <Message>{children}</Message>
    </Wrapper>
  );
}

EmptyIndicator.propTypes = {
  children: PropTypes.node.isRequired,
};

import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { Card, Heading2, Subheading } from "../../design-system";

const Wrapper = styled.section`
  & + & {
    padding-top: var(--size-32);
  }
`;

const Content = styled(Card)`
  margin-top: var(--size-16);
`;

export default function Section({ children, description, heading }) {
  return (
    <Wrapper>
      <Heading2>{heading}</Heading2>
      {description && <Subheading>{description}</Subheading>}
      <Content>{children}</Content>
    </Wrapper>
  );
}

Section.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string,
  heading: PropTypes.string.isRequired,
};

Section.defaultProps = {
  description: null,
};

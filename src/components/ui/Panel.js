import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { FlexStart } from "./Flexboxes";

const Wrapper = styled.dl`
  background-color: var(--color-light-gray);
  border-radius: var(--corner-radius);
  margin-bottom: var(--size-16);
  margin-top: var(--size-16);
  padding: var(--size-8) var(--size-16);
`;

const Row = styled(FlexStart)`
  &:not(:last-of-type) {
    margin-bottom: var(--size-8);
  }
`;

const Term = styled.dt`
  flex: 1;
  font-weight: var(--weight-bold);
  letter-spacing: var(--letter-spacing);
`;

const Description = styled.dd`
  margin-left: 0;
  flex: 2;
`;

export default function Panel({ items }) {
  return (
    <Wrapper>
      {items.map(([term, description]) => (
        <Row key={term}>
          <Term>{term}</Term>
          <Description>{description}</Description>
        </Row>
      ))}
    </Wrapper>
  );
}

Panel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.array).isRequired,
};

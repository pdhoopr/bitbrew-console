import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { FlexStart } from "./Flexboxes";

const Wrapper = styled.dl`
  margin-bottom: 0;
  margin-top: 0;
`;

const Row = styled(FlexStart)`
  border-top: var(--border-divider);
`;

const Term = styled.dt`
  flex: 1;
  font-weight: var(--weight-bold);
  letter-spacing: var(--letter-spacing);
  padding: var(--size-16) var(--size-24);
`;

const Description = styled.dd`
  flex: 3;
  margin-left: 0;
  overflow: auto;
  padding: var(--size-16) var(--size-24);
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export default function List({ items }) {
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

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.array).isRequired,
};

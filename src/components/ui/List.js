import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { FlexStart } from "./Flexboxes";

const Wrapper = styled.dl`
  margin-bottom: 0;
  margin-top: 0;
`;

const Row = styled(FlexStart)`
  border-top: 1px solid var(--color-medium-gray);
  padding: var(--size-16) var(--size-24);
`;

const Term = styled.dt`
  flex: 1;
  font-weight: var(--weight-bold);
`;

const Description = styled.dd`
  margin-left: 0;
  flex: 1.5;
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

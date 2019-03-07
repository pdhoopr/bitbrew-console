import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  align-items: center;
  border-top: var(--border-divider);
  display: flex;
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
  padding: var(--size-16) var(--size-24);
`;

export default function ListItem({ children, heading }) {
  return (
    <Wrapper>
      <Term>{heading}</Term>
      <Description>{children}</Description>
    </Wrapper>
  );
}

ListItem.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
};

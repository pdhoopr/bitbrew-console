import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Overflow = styled.div`
  background-color: var(--color-white);
  border-radius: var(--corner-radius);
  box-shadow: var(--elevation-low);
  overflow-y: auto;
  width: 100%;
`;

const Wrapper = styled.table`
  border-collapse: collapse;
  font-size: var(--size-14);
  line-height: var(--size-20);
  width: 100%;
`;

export const Row = styled.tr`
  border-top: 1px solid var(--color-medium-gray);
  font-style: ${({ italic }) => (italic ? "italic" : "normal")};
`;

export const Cell = styled.td`
  color: ${({ gray }) => (gray ? "var(--color-dark-gray)" : "inherit")};
  padding: var(--size-16) var(--size-24);
  text-align: left;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const HeaderCell = styled(Cell)`
  font-weight: var(--weight-bold);
  letter-spacing: var(--letter-spacing);
  white-space: nowrap;
`;

const EmptyCell = styled(Cell)`
  color: var(--color-dark-gray);
  text-align: center;
`;

export const IconCell = styled.span`
  display: block;
  margin-bottom: calc(-1 * var(--size-8));
  margin-top: calc(-1 * var(--size-8));
  text-align: right;
`;

export default function Table({ children, columns, emptyState }) {
  return (
    <Overflow>
      <Wrapper>
        <thead>
          <tr>
            {columns.map(column => (
              <HeaderCell as="th" key={column.key || column}>
                {column}
              </HeaderCell>
            ))}
          </tr>
        </thead>
        <tbody>
          {React.Children.count(children) > 0
            ? children
            : emptyState && (
                <Row>
                  <EmptyCell colSpan={columns.length}>{emptyState}</EmptyCell>
                </Row>
              )}
        </tbody>
      </Wrapper>
    </Overflow>
  );
}

Table.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.arrayOf(PropTypes.node).isRequired,
  emptyState: PropTypes.string,
};

Table.defaultProps = {
  emptyState: null,
};

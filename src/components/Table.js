import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.table`
  background-color: var(--color-white);
  border-collapse: collapse;
  border-radius: var(--corner-radius);
  box-shadow: var(--elevation-low);
  font-size: var(--size-14);
  line-height: var(--size-20);
  width: 100%;
`;

export const Row = styled.tr`
  border-top: 1px solid var(--color-medium-gray);
  font-style: ${({ italic }) => (italic ? 'italic' : 'normal')};
`;

export const Cell = styled.td`
  color: ${({ gray }) => (gray ? 'var(--color-dark-gray)' : 'inherit')};
  padding: var(--size-16) var(--size-24);
  text-align: left;
  white-space: nowrap;
`;

const HeaderCell = styled(Cell.withComponent('th'))`
  font-weight: var(--weight-bold);
`;

const EmptyCell = styled(Cell)`
  color: var(--color-dark-gray);
  text-align: center;
`;

function Table({ children, columns, emptyState }) {
  return (
    <Wrapper>
      <thead>
        <tr>
          {columns.map(column => (
            <HeaderCell key={column.key || column}>{column}</HeaderCell>
          ))}
        </tr>
      </thead>
      <tbody>
        {children.length > 0
          ? children
          : emptyState && (
              <Row>
                <EmptyCell colSpan={columns.length}>{emptyState}</EmptyCell>
              </Row>
            )}
      </tbody>
    </Wrapper>
  );
}

Table.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  ).isRequired,
  emptyState: PropTypes.string,
};

Table.defaultProps = {
  emptyState: null,
};

export default observer(Table);

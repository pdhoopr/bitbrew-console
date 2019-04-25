import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import {
  Card,
  IconButton,
  Menu,
  MenuItem,
  NavigateFirstIcon,
  NavigateLastIcon,
  NavigateNextIcon,
  NavigatePreviousIcon,
  Table,
} from "../../design-system";
import { capitalize, pluralize } from "../../utils";
import pageSizes from "./pageSizes";
import resourceTypes from "./resourceTypes";

const Controls = styled.div`
  align-items: center;
  background-color: var(--color-white-gray);
  border-top: var(--border-divider);
  color: var(--color-dark-gray);
  display: flex;
  justify-content: flex-end;
  padding: var(--size-8) var(--size-16);
`;

const NumItemsMenu = styled(Menu)`
  margin-right: auto;

  [aria-haspopup] {
    font-weight: var(--weight-regular);
    letter-spacing: normal;
  }

  [role="menuitem"][disabled] {
    color: var(--color-green);
    cursor: default;
    font-weight: var(--weight-bold);
    letter-spacing: var(--letter-spacing);

    &::before {
      content: none;
    }
  }
`;

const NavigateButton = styled(IconButton)`
  margin-left: var(--size-8);

  &[disabled] {
    cursor: default;
    opacity: 0.4;

    &::before {
      content: none;
    }
  }
`;

const Range = styled.span`
  padding-left: var(--size-16);
  padding-right: var(--size-8);
`;

export default function PaginatedTable({
  children,
  headings,
  pagination,
  resourceType,
}) {
  const numItemsLabel = `${capitalize(pluralize(resourceType))} per page:`;
  return (
    <Card>
      <Table headings={headings}>{children}</Table>
      <Controls>
        <NumItemsMenu
          heading={`${numItemsLabel}\xa0\xa0${pagination.numItemsPerPage}`}
        >
          {pageSizes.map(size => (
            <MenuItem
              key={size}
              disabled={size === pagination.numItemsPerPage}
              onClick={() => pagination.reloadWithPageSize(size)}
            >
              {size}
            </MenuItem>
          ))}
        </NumItemsMenu>
        <NavigateButton
          disabled={pagination.isAtStart}
          onClick={pagination.loadFirstPage}
          title="Newest"
        >
          <NavigateFirstIcon />
        </NavigateButton>
        <NavigateButton
          disabled={pagination.isAtStart}
          onClick={pagination.loadPreviousPage}
          title="Newer"
        >
          <NavigatePreviousIcon />
        </NavigateButton>
        <Range>{pagination.currentRange}</Range>
        <NavigateButton
          disabled={pagination.isAtEnd}
          onClick={pagination.loadNextPage}
          title="Older"
        >
          <NavigateNextIcon />
        </NavigateButton>
        <NavigateButton
          disabled={pagination.isAtEnd}
          onClick={pagination.loadLastPage}
          title="Oldest"
        >
          <NavigateLastIcon />
        </NavigateButton>
      </Controls>
    </Card>
  );
}

PaginatedTable.propTypes = {
  children: PropTypes.node.isRequired,
  headings: PropTypes.arrayOf(PropTypes.string).isRequired,
  pagination: PropTypes.shape({
    currentRange: PropTypes.string.isRequired,
    isAtEnd: PropTypes.bool.isRequired,
    isAtStart: PropTypes.bool.isRequired,
    loadFirstPage: PropTypes.func.isRequired,
    loadLastPage: PropTypes.func.isRequired,
    loadNextPage: PropTypes.func.isRequired,
    loadPreviousPage: PropTypes.func.isRequired,
    numItemsPerPage: PropTypes.number.isRequired,
    reloadWithPageSize: PropTypes.func.isRequired,
  }).isRequired,
  resourceType: PropTypes.oneOf(resourceTypes).isRequired,
};

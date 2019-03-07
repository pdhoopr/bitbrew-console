import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import {
  Card,
  EmptyIndicator,
  Heading1,
  RaisedButton,
} from "../../design-system";
import { capitalize, pluralize } from "../../utils";
import Main from "./Main";
import parentResourceTypes from "./parentResourceTypes";
import resourceTypes from "./resourceTypes";

const Intro = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  padding-bottom: var(--size-32);
  padding-top: var(--size-32);
`;

const NewButton = styled(RaisedButton)`
  margin-left: var(--size-24);
  margin-top: var(--size-2);
`;

export default function ListPage({
  children,
  isLoading,
  onOpenForm,
  resource,
}) {
  const plural = pluralize(resource);
  const parent = parentResourceTypes[resource];
  return (
    <Main>
      <Intro>
        <Heading1>{capitalize(plural)}</Heading1>
        {!isLoading && onOpenForm && (
          <NewButton onClick={onOpenForm}>New</NewButton>
        )}
      </Intro>
      {!isLoading &&
        (children ? (
          <Card>{children}</Card>
        ) : (
          <EmptyIndicator>
            There are no {plural}
            {parent && ` in this ${parent}`} yet.
          </EmptyIndicator>
        ))}
    </Main>
  );
}

ListPage.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onOpenForm: PropTypes.func,
  resource: PropTypes.oneOf(Object.values(resourceTypes)).isRequired,
};

ListPage.defaultProps = {
  onOpenForm: null,
};

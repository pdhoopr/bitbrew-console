import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { EmptyIndicator, Heading1, RaisedButton } from "../../design-system";
import { capitalize, pluralize } from "../../utils";
import Main from "./Main";
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

export default function ListScreen({
  children,
  isLoading,
  onOpenForm,
  resourceType,
}) {
  const plural = pluralize(resourceType);
  return (
    <Main>
      <Intro>
        <Heading1>{capitalize(plural)}</Heading1>
        {!isLoading && onOpenForm && (
          <NewButton onClick={onOpenForm}>New</NewButton>
        )}
      </Intro>
      {!isLoading &&
        (children || (
          <EmptyIndicator>
            There aren&apos;t any {plural} here yet.
          </EmptyIndicator>
        ))}
    </Main>
  );
}

ListScreen.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onOpenForm: PropTypes.func,
  resourceType: PropTypes.oneOf(resourceTypes).isRequired,
};

ListScreen.defaultProps = {
  onOpenForm: null,
};

import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import {
  EmptyIcon,
  Heading1,
  RaisedButton,
  Subheading,
} from "../../design-system";
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

const EmptyState = styled.div`
  color: var(--color-dark-gray);
  padding: var(--size-40) var(--size-24);
  position: relative;
  text-align: center;

  &::before {
    background-color: currentColor;
    border-radius: var(--corner-radius);
    bottom: 0;
    content: "";
    left: 0;
    opacity: 0.1;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

const EmptyMessage = styled(Subheading)`
  padding-top: var(--size-8);
`;

export default function ListScreen({
  children,
  onOpenCreate,
  resourceType,
  showContent,
}) {
  const plural = pluralize(resourceType);
  return (
    showContent && (
      <Main>
        <Intro>
          <Heading1>{capitalize(plural)}</Heading1>
          {onOpenCreate && <NewButton onClick={onOpenCreate}>New</NewButton>}
        </Intro>
        {children || (
          <EmptyState>
            <EmptyIcon aria-hidden />
            <EmptyMessage>There are no {plural} here yet.</EmptyMessage>
          </EmptyState>
        )}
      </Main>
    )
  );
}

ListScreen.propTypes = {
  children: PropTypes.node.isRequired,
  onOpenCreate: PropTypes.func,
  resourceType: PropTypes.oneOf(resourceTypes).isRequired,
  showContent: PropTypes.bool.isRequired,
};

ListScreen.defaultProps = {
  onOpenCreate: null,
};

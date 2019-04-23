import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import {
  BlockLink,
  Button,
  Card,
  Heading1,
  Heading2,
  List,
  ListItem,
  RaisedButton,
  Subheading,
  SyncDisabledIcon,
  SyncIcon,
} from "../../design-system";
import { capitalize, localize, pluralize } from "../../utils";
import Main from "./Main";
import Name from "./Name";
import resourceTypes from "./resourceTypes";
import Section from "./Section";

const Intro = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  padding-bottom: var(--size-32);
  padding-top: var(--size-32);
`;

const EditButton = styled(RaisedButton)`
  margin-left: var(--size-24);
  margin-top: var(--size-2);
`;

const Metrics = styled.div`
  display: flex;
  padding-bottom: var(--size-32);
`;

const MetricHeading = styled(Card)`
  flex: 1;
  transition: box-shadow var(--effect-duration);

  &:hover,
  &:focus-within {
    box-shadow: var(--elevation-medium);
  }

  & + & {
    margin-left: var(--size-16);
  }
`;

const MetricLink = styled(BlockLink)`
  &::before {
    content: none;
  }
`;

const DeleteButton = styled(Button)`
  color: var(--color-dark-gray);
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: var(--size-56);
  transition: color var(--effect-duration);

  &:hover,
  &:focus {
    color: var(--color-red);
  }
`;

export default function ViewScreen({
  children,
  isLoading,
  metrics,
  onOpenDelete,
  onOpenUpdate,
  resource,
}) {
  const status = resource.enabled ? "enabled" : "disabled";
  const statusTooltip = `${capitalize(resource.impl)} is ${status}`;
  return (
    !isLoading && (
      <Main>
        <Intro>
          {resource.description ? (
            <div>
              <Heading1>
                <Name resource={resource} />
              </Heading1>
              <Subheading>{resource.description}</Subheading>
            </div>
          ) : (
            <Heading1>
              <Name resource={resource} />
            </Heading1>
          )}
          {onOpenUpdate && <EditButton onClick={onOpenUpdate}>Edit</EditButton>}
        </Intro>
        {metrics && (
          <Metrics>
            {metrics.map(({ label, value }) => (
              <MetricHeading key={label} as={Heading2}>
                <MetricLink to={`${label}s`}>
                  {value}
                  <Subheading as="span">
                    {pluralize(label, value).replace(/^\d+\s/, "")}
                  </Subheading>
                </MetricLink>
              </MetricHeading>
            ))}
          </Metrics>
        )}
        <Section heading="Overview">
          <List>
            <ListItem heading="ID">{resource.id}</ListItem>
            {resource.enabled != null && (
              <ListItem heading="Enabled">
                <span title={statusTooltip} aria-label={statusTooltip}>
                  {resource.enabled ? <SyncIcon /> : <SyncDisabledIcon />}
                </span>
              </ListItem>
            )}
            <ListItem heading="Created On">
              {localize(resource.createdAt, {
                time: !!resource.updatedAt,
              })}
            </ListItem>
            {resource.updatedAt && (
              <ListItem heading="Last Modified On">
                {localize(resource.updatedAt, {
                  time: true,
                })}
              </ListItem>
            )}
          </List>
        </Section>
        {children}
        <DeleteButton onClick={onOpenDelete}>
          Delete {resource.impl}
        </DeleteButton>
      </Main>
    )
  );
}

ViewScreen.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool.isRequired,
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ),
  onOpenDelete: PropTypes.func.isRequired,
  onOpenUpdate: PropTypes.func,
  resource: PropTypes.shape({
    createdAt: PropTypes.string,
    description: PropTypes.string,
    enabled: PropTypes.bool,
    id: PropTypes.string,
    impl: PropTypes.oneOf(resourceTypes).isRequired,
    updatedAt: PropTypes.string,
  }).isRequired,
};

ViewScreen.defaultProps = {
  children: null,
  metrics: null,
  onOpenUpdate: null,
};

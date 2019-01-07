import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { viewDestination } from "../../api";
import { capitalize, localize } from "../../utils";
import Context from "../Context";
import useLoading from "../hooks/useLoading";
import AppBar from "../ui/AppBar";
import { RaisedButton } from "../ui/Buttons";
import DeleteButton from "../ui/DeleteButton";
import { FlexBetween } from "../ui/Flexboxes";
import { PageHeader } from "../ui/Headers";
import { BackIcon, SyncDisabledIcon, SyncIcon } from "../ui/Icons";
import { IconLink } from "../ui/Links";
import List from "../ui/List";
import { Content, Section } from "../ui/Sections";
import { PageHeading, SectionHeading, SubHeading } from "../ui/Texts";
import { Width640 } from "../ui/Widths";
import DeleteDestinationDialog from "./DeleteDestinationDialog";
import EditDestinationForm from "./EditDestinationForm";

const Heading = styled(PageHeading)`
  margin-left: var(--size-16);
  margin-right: auto;
`;

export default function DestinationOverviewPage({
  destinationId,
  navigate,
  orgId,
  projectId,
}) {
  const { openDialog, openDrawer } = useContext(Context);

  const [destination, setDestination] = useState({});

  async function loadDestination() {
    const data = await viewDestination(destinationId);
    setDestination(data);
  }

  const isLoading = useLoading(loadDestination, [destinationId]);

  const destinationsUrl = `/orgs/${orgId}/projects/${projectId}/destinations`;
  const type = destination.type ? capitalize(destination.type.trim()) : "";
  return (
    <main>
      <PageHeader>
        <AppBar>
          <IconLink
            to={destinationsUrl}
            title="View all destinations for this project"
          >
            <BackIcon />
          </IconLink>
          <Heading>{destination.name || <span>&nbsp;</span>}</Heading>
        </AppBar>
      </PageHeader>
      {!isLoading && (
        <Width640>
          <Section>
            <FlexBetween>
              <SectionHeading>Overview</SectionHeading>
              <RaisedButton
                onClick={() => {
                  openDrawer(
                    <EditDestinationForm
                      destination={destination}
                      onUpdate={loadDestination}
                    />,
                  );
                }}
              >
                Edit
              </RaisedButton>
            </FlexBetween>
            <Content>
              <List
                items={[
                  ["ID", destination.id],
                  [
                    "Enabled",
                    destination.enabled ? (
                      <span
                        title="This destination is enabled"
                        aria-label="This destination is enabled"
                      >
                        <SyncIcon />
                      </span>
                    ) : (
                      <span
                        title="This destination is disabled"
                        aria-label="This destination is disabled"
                      >
                        <SyncDisabledIcon />
                      </span>
                    ),
                  ],
                  [
                    "Created On",
                    localize(destination.createdAt, {
                      time: true,
                    }),
                  ],
                  [
                    "Last Modified On",
                    localize(destination.updatedAt, {
                      time: true,
                    }),
                  ],
                ]}
              />
            </Content>
          </Section>
          <Section>
            <SectionHeading>Destination Settings</SectionHeading>
            <SubHeading gray>
              Details about your destination that are relevant to its type.
            </SubHeading>
            <Content>
              {type.toUpperCase() === "AMQP" && (
                <List
                  items={[
                    ["Type", type],
                    ["Username", destination.amqpUser],
                    ["Password", destination.amqpPassword],
                    ["Host", destination.amqpHost],
                    ["Virtual Host", destination.amqpVhost],
                    [
                      "Port",
                      [
                        destination.amqpPort,
                        destination.amqpSecure ? " (uses TLS)" : "",
                      ].join(""),
                    ],
                    ["Routing Key", destination.amqpDefaultRoutingKey],
                    ["Query String", destination.amqpQuery],
                  ]}
                />
              )}
              {type.toUpperCase() === "KEEN" && (
                <List
                  items={[
                    ["Type", type],
                    ["Project ID", destination.keenProjectId],
                    ["Write Key", destination.keenWriteKey],
                    ["Event Collection", destination.keenStreamName],
                  ]}
                />
              )}
            </Content>
          </Section>
          <DeleteButton
            onClick={() => {
              openDialog(
                <DeleteDestinationDialog
                  destination={destination}
                  onDelete={() => {
                    navigate(destinationsUrl);
                  }}
                />,
              );
            }}
          >
            Delete destination
          </DeleteButton>
        </Width640>
      )}
    </main>
  );
}

DestinationOverviewPage.propTypes = {
  destinationId: PropTypes.string,
  navigate: PropTypes.func,
  orgId: PropTypes.string,
  projectId: PropTypes.string,
};

DestinationOverviewPage.defaultProps = {
  destinationId: null,
  navigate: null,
  orgId: null,
  projectId: null,
};

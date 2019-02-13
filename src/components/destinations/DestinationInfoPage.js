import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { viewDestination } from "../../api";
import { capitalize, localize } from "../../utils";
import GlobalContext from "../GlobalContext";
import useLoading from "../hooks/useLoading";
import BackLink from "../ui/BackLink";
import { RaisedButton } from "../ui/Buttons";
import DeleteButton from "../ui/DeleteButton";
import { FlexBetween } from "../ui/Flexboxes";
import { PageHeader } from "../ui/Headers";
import { SyncDisabledIcon, SyncIcon } from "../ui/Icons";
import List from "../ui/List";
import { Content, Section } from "../ui/Sections";
import { PageHeading, SectionHeading, SubHeading } from "../ui/Texts";
import { Width800 } from "../ui/Widths";
import DeleteDestinationDialog from "./DeleteDestinationDialog";
import EditDestinationForm from "./EditDestinationForm";

export default function DestinationInfoPage({
  destinationId,
  navigate,
  orgId,
  projectId,
}) {
  const { openDialog, openDrawer } = useContext(GlobalContext);

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
      <Width800>
        <BackLink
          to={destinationsUrl}
          title="View all destinations in this project"
        />
        {!isLoading && (
          <React.Fragment>
            <PageHeader>
              <FlexBetween>
                <PageHeading>
                  {destination.name || <span>&nbsp;</span>}
                </PageHeading>
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
            </PageHeader>
            <Section>
              <SectionHeading>Overview</SectionHeading>
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
              Delete this destination
            </DeleteButton>
          </React.Fragment>
        )}
      </Width800>
    </main>
  );
}

DestinationInfoPage.propTypes = {
  destinationId: PropTypes.string,
  navigate: PropTypes.func,
  orgId: PropTypes.string,
  projectId: PropTypes.string,
};

DestinationInfoPage.defaultProps = {
  destinationId: null,
  navigate: null,
  orgId: null,
  projectId: null,
};

import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { listDestinations } from "../../api";
import { capitalize, localize } from "../../utils";
import GlobalContext from "../GlobalContext";
import useLoading from "../hooks/useLoading";
import { RaisedButton } from "../ui/Buttons";
import { FlexBetween } from "../ui/Flexboxes";
import { PageHeader } from "../ui/Headers";
import { Link } from "../ui/Links";
import Table, { Cell, Row } from "../ui/Table";
import { PageHeading } from "../ui/Texts";
import { Width640 } from "../ui/Widths";
import NewDestinationForm from "./NewDestinationForm";

export default function DestinationsPage({ orgId, projectId }) {
  const { openDrawer } = useContext(GlobalContext);

  const [destinations, setDestinations] = useState([]);

  async function loadDestinations() {
    const { items } = await listDestinations(projectId);
    setDestinations(items);
  }

  const isLoading = useLoading(loadDestinations, [projectId]);

  return (
    <main>
      <Width640>
        <PageHeader>
          <FlexBetween>
            <PageHeading>Destinations</PageHeading>
            <RaisedButton
              onClick={() => {
                openDrawer(
                  <NewDestinationForm
                    project={projectId}
                    onCreate={loadDestinations}
                  />,
                );
              }}
            >
              New
            </RaisedButton>
          </FlexBetween>
        </PageHeader>
        {!isLoading && (
          <Table
            columns={["Name", "Created On", "Type"]}
            emptyState="There are no destinations in this project yet."
          >
            {destinations.map(destination => {
              const { id: destinationId } = destination;
              return (
                <Row key={destination.id} italic={!destination.enabled}>
                  <Cell>
                    <Link
                      to={`/orgs/${orgId}/projects/${projectId}/destinations/${destinationId}`}
                    >
                      {destination.name}
                      {!destination.enabled && " (disabled)"}
                    </Link>
                  </Cell>
                  <Cell>{localize(destination.createdAt)}</Cell>
                  <Cell>{capitalize(destination.type)}</Cell>
                </Row>
              );
            })}
          </Table>
        )}
      </Width640>
    </main>
  );
}

DestinationsPage.propTypes = {
  orgId: PropTypes.string,
  projectId: PropTypes.string,
};

DestinationsPage.defaultProps = {
  orgId: null,
  projectId: null,
};

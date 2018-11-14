import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { listDestinations } from "../../api";
import { capitalize, localize } from "../../utils";
import Context from "../Context";
import useLoading from "../hooks/useLoading";
import AppBar from "../ui/AppBar";
import { IconButton } from "../ui/Buttons";
import { PageHeader } from "../ui/Headers";
import { AddIcon } from "../ui/Icons";
import Table, { Cell, IconCell, Row } from "../ui/Table";
import { PageHeading } from "../ui/Texts";
import { Width640 } from "../ui/Widths";
import NewDestinationForm from "./NewDestinationForm";

export default function DestinationsPage({ projectId }) {
  const { openDrawer } = useContext(Context);

  const [destinations, setDestinations] = useState([]);

  async function loadDestinations() {
    const { items } = await listDestinations(projectId);
    setDestinations(items);
  }

  const isLoading = useLoading(loadDestinations, [projectId]);

  return (
    <main>
      <PageHeader>
        <AppBar>
          <PageHeading>Destinations</PageHeading>
        </AppBar>
      </PageHeader>
      {!isLoading && (
        <Width640>
          <Table
            columns={[
              "Name",
              "Date Created",
              "Type",
              <IconCell key="New Destination">
                <IconButton
                  onClick={() => {
                    openDrawer(
                      <NewDestinationForm
                        project={projectId}
                        onCreate={loadDestinations}
                      />,
                    );
                  }}
                  title="Open new destination form"
                >
                  <AddIcon />
                </IconButton>
              </IconCell>,
            ]}
            emptyState="There are no destinations in this project yet."
          >
            {destinations.map(destination => (
              <Row key={destination.id} italic={!destination.enabled}>
                <Cell>
                  {destination.name}
                  {!destination.enabled && " (disabled)"}
                </Cell>
                <Cell>{localize(destination.createdAt)}</Cell>
                <Cell>{capitalize(destination.type)}</Cell>
                <Cell />
              </Row>
            ))}
          </Table>
        </Width640>
      )}
    </main>
  );
}

DestinationsPage.propTypes = {
  projectId: PropTypes.string,
};

DestinationsPage.defaultProps = {
  projectId: null,
};

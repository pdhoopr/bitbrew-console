import PropTypes from "prop-types";
import React, { useState } from "react";
import { listDestinations } from "../../api";
import { capitalize, localize } from "../../utils";
import useLoading from "../hooks/useLoading";
import AppBar from "../ui/AppBar";
import { PageHeader } from "../ui/Headers";
import Table, { Cell, Row } from "../ui/Table";
import { PageTitle } from "../ui/Texts";
import { Width640 } from "../ui/Widths";

export default function DestinationsPage({ projectId }) {
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
          <PageTitle>Destinations</PageTitle>
        </AppBar>
      </PageHeader>
      {!isLoading && (
        <Width640>
          <Table
            columns={["Name", "Date Created", "Type"]}
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

import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { listDestinations } from "../../api";
import { Table, TableCell, TableRow } from "../../design-system";
import { capitalize, localize } from "../../utils";
import GlobalContext from "../GlobalContext";
import ListPage from "../shared/ListPage";
import NameTableCell from "../shared/NameTableCell";
import resourceTypes from "../shared/resourceTypes";
import useLoading from "../shared/useLoading";
import CreateDestinationForm from "./CreateDestinationForm";

export default function ListDestinationsPage({ projectId }) {
  const { openDrawer } = useContext(GlobalContext);

  const [destinations, setDestinations] = useState([]);

  async function loadDestinations() {
    const { items } = await listDestinations(projectId);
    setDestinations(items);
  }

  const isLoading = useLoading(loadDestinations, [projectId]);

  return (
    <ListPage
      isLoading={isLoading}
      resource={resourceTypes.destination}
      onOpenForm={() => {
        openDrawer(
          <CreateDestinationForm
            project={projectId}
            onCreate={loadDestinations}
          />,
        );
      }}
    >
      {destinations.length > 0 && (
        <Table headings={["Name", "Created On", "Type"]}>
          {destinations.map(destination => (
            <TableRow key={destination.id} italic={!destination.enabled}>
              <NameTableCell
                resource={{
                  impl: resourceTypes.destination,
                  ...destination,
                }}
              />
              <TableCell>{localize(destination.createdAt)}</TableCell>
              <TableCell>{capitalize(destination.type)}</TableCell>
            </TableRow>
          ))}
        </Table>
      )}
    </ListPage>
  );
}

ListDestinationsPage.propTypes = {
  projectId: PropTypes.string,
};

ListDestinationsPage.defaultProps = {
  projectId: null,
};

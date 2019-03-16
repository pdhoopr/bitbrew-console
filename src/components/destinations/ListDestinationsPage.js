import PropTypes from "prop-types";
import React, { useContext } from "react";
import { listDestinations } from "../../api";
import { Table, TableCell, TableRow } from "../../design-system";
import { capitalize, localize } from "../../utils";
import AppContext from "../AppContext";
import ListPage from "../shared/ListPage";
import NameTableCell from "../shared/NameTableCell";
import { destinationType } from "../shared/resourceTypes";
import useLoading from "../shared/useLoading";
import useResource from "../shared/useResource";
import CreateDestinationForm from "./CreateDestinationForm";

export default function ListDestinationsPage({ projectId }) {
  const { openDrawer } = useContext(AppContext);

  const [destinations, setDestinations] = useResource(destinationType, []);

  async function loadDestinations() {
    const { items } = await listDestinations(projectId);
    setDestinations(items);
  }

  const isLoading = useLoading(loadDestinations, [projectId]);

  return (
    <ListPage
      isLoading={isLoading}
      resourceType={destinationType}
      onOpenForm={() => {
        openDrawer(
          <CreateDestinationForm
            projectId={projectId}
            onCreate={loadDestinations}
          />,
        );
      }}
    >
      {destinations.length > 0 && (
        <Table headings={["Name", "Created On", "Type"]}>
          {destinations.map(destination => (
            <TableRow key={destination.id} italic={!destination.enabled}>
              <NameTableCell resource={destination} />
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

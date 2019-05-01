import PropTypes from "prop-types";
import React, { useContext } from "react";
import { listDestinations } from "../../api";
import { TableCell, TableRow } from "../../design-system";
import { capitalize, localize } from "../../utils";
import AppContext from "../AppContext";
import ListScreen from "../shared/ListScreen";
import NameTableCell from "../shared/NameTableCell";
import PaginatedTable from "../shared/PaginatedTable";
import { destinationType } from "../shared/resourceTypes";
import usePagination from "../shared/usePagination";
import useResource from "../shared/useResource";
import CreateDestinationForm from "./CreateDestinationForm";

export default function ListDestinationsScreen({ projectId }) {
  const { openDrawer } = useContext(AppContext);

  const [destinations, setDestinations] = useResource(destinationType, []);

  async function loadDestinations(params) {
    const { items, ...pageData } = await listDestinations(projectId, params);
    setDestinations(items);
    return pageData;
  }

  const pagination = usePagination(loadDestinations, [projectId]);

  return (
    <ListScreen
      showContent={pagination.isReady}
      resourceType={destinationType}
      onOpenCreate={() => {
        openDrawer(
          <CreateDestinationForm
            projectId={projectId}
            onCreate={pagination.loadFirstPage}
          />,
        );
      }}
    >
      {pagination.hasItems && (
        <PaginatedTable
          resourceType={destinationType}
          headings={["Name", "Created On", "Type"]}
          pagination={pagination}
        >
          {destinations.map(destination => (
            <TableRow key={destination.id} italic={!destination.enabled}>
              <NameTableCell resource={destination} />
              <TableCell>{localize(destination.createdAt)}</TableCell>
              <TableCell>{capitalize(destination.type)}</TableCell>
            </TableRow>
          ))}
        </PaginatedTable>
      )}
    </ListScreen>
  );
}

ListDestinationsScreen.propTypes = {
  projectId: PropTypes.string,
};

ListDestinationsScreen.defaultProps = {
  projectId: null,
};

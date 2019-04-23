import PropTypes from "prop-types";
import React, { useContext } from "react";
import { listDevices } from "../../api";
import { TableCell, TableRow } from "../../design-system";
import { capitalize, localize } from "../../utils";
import AppContext from "../AppContext";
import ListScreen from "../shared/ListScreen";
import NameTableCell from "../shared/NameTableCell";
import PaginatedTable from "../shared/PaginatedTable";
import { deviceType } from "../shared/resourceTypes";
import usePagination from "../shared/usePagination";
import useResource from "../shared/useResource";
import CreateDeviceForm from "./CreateDeviceForm";

export default function ListDevicesScreen({ projectId }) {
  const { openDrawer } = useContext(AppContext);

  const [devices, setDevices] = useResource(deviceType, []);

  async function loadDevices(params) {
    const { items, ...pageData } = await listDevices(projectId, params);
    setDevices(items);
    return pageData;
  }

  const pagination = usePagination(loadDevices, [projectId]);

  return (
    <ListScreen
      isLoading={pagination.isLoading}
      resourceType={deviceType}
      onOpenCreate={() => {
        openDrawer(
          <CreateDeviceForm
            projectId={projectId}
            onCreate={pagination.loadFirstPage}
          />,
        );
      }}
    >
      {pagination.hasItems && (
        <PaginatedTable
          resourceType={deviceType}
          headings={["Codename", "Created On", "Type"]}
          pagination={pagination}
        >
          {devices.map(device => (
            <TableRow key={device.id} italic={!device.enabled}>
              <NameTableCell resource={device} />
              <TableCell>{localize(device.createdAt)}</TableCell>
              <TableCell>{capitalize(device.type)}</TableCell>
            </TableRow>
          ))}
        </PaginatedTable>
      )}
    </ListScreen>
  );
}

ListDevicesScreen.propTypes = {
  projectId: PropTypes.string,
};

ListDevicesScreen.defaultProps = {
  projectId: null,
};

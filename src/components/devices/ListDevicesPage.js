import PropTypes from "prop-types";
import React, { useContext } from "react";
import { listDevices } from "../../api";
import { Table, TableCell, TableRow } from "../../design-system";
import { capitalize, localize } from "../../utils";
import AppContext from "../AppContext";
import ListPage from "../shared/ListPage";
import NameTableCell from "../shared/NameTableCell";
import { deviceType } from "../shared/resourceTypes";
import useLoading from "../shared/useLoading";
import useResource from "../shared/useResource";
import CreateDeviceForm from "./CreateDeviceForm";

export default function ListDevicesPage({ projectId }) {
  const { openDrawer } = useContext(AppContext);

  const [devices, setDevices] = useResource(deviceType, []);

  async function loadDevices() {
    const { items } = await listDevices(projectId);
    setDevices(items);
  }

  const isLoading = useLoading(loadDevices, [projectId]);

  return (
    <ListPage
      isLoading={isLoading}
      resourceType={deviceType}
      onOpenForm={() => {
        openDrawer(
          <CreateDeviceForm projectId={projectId} onCreate={loadDevices} />,
        );
      }}
    >
      {devices.length > 0 && (
        <Table headings={["Codename", "Created On", "Type"]}>
          {devices.map(device => (
            <TableRow key={device.id} italic={!device.enabled}>
              <NameTableCell resource={device} />
              <TableCell>{localize(device.createdAt)}</TableCell>
              <TableCell>{capitalize(device.type)}</TableCell>
            </TableRow>
          ))}
        </Table>
      )}
    </ListPage>
  );
}

ListDevicesPage.propTypes = {
  projectId: PropTypes.string,
};

ListDevicesPage.defaultProps = {
  projectId: null,
};

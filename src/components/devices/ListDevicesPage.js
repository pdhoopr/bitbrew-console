import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { listDevices } from "../../api";
import { Table, TableCell, TableRow } from "../../design-system";
import { capitalize, localize } from "../../utils";
import GlobalContext from "../GlobalContext";
import ListPage from "../shared/ListPage";
import NameTableCell from "../shared/NameTableCell";
import resourceTypes from "../shared/resourceTypes";
import useLoading from "../shared/useLoading";
import CreateDeviceForm from "./CreateDeviceForm";

export default function ListDevicesPage({ projectId }) {
  const { openDrawer } = useContext(GlobalContext);

  const [devices, setDevices] = useState([]);

  async function loadDevices() {
    const { items } = await listDevices(projectId);
    setDevices(items);
  }

  const isLoading = useLoading(loadDevices, [projectId]);

  return (
    <ListPage
      isLoading={isLoading}
      resource={resourceTypes.device}
      onOpenForm={() => {
        openDrawer(
          <CreateDeviceForm project={projectId} onCreate={loadDevices} />,
        );
      }}
    >
      {devices.length > 0 && (
        <Table headings={["Codename", "Created On", "Type"]}>
          {devices.map(device => (
            <TableRow key={device.id} italic={!device.enabled}>
              <NameTableCell
                resource={{
                  impl: resourceTypes.device,
                  ...device,
                }}
              />
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

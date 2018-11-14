import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { listDevices } from "../../api";
import { capitalize, localize } from "../../utils";
import Context from "../Context";
import useLoading from "../hooks/useLoading";
import AppBar from "../ui/AppBar";
import { IconButton } from "../ui/Buttons";
import { PageHeader } from "../ui/Headers";
import { AddIcon } from "../ui/Icons";
import { Link } from "../ui/Links";
import Table, { Cell, IconCell, Row } from "../ui/Table";
import { PageHeading } from "../ui/Texts";
import { Width640 } from "../ui/Widths";
import NewDeviceForm from "./NewDeviceForm";

export default function DevicesPage({ orgId, projectId }) {
  const { openDrawer } = useContext(Context);

  const [devices, setDevices] = useState([]);

  async function loadDevices() {
    const { items } = await listDevices(projectId);
    setDevices(items);
  }

  const isLoading = useLoading(loadDevices, [projectId]);

  return (
    <main>
      <PageHeader>
        <AppBar>
          <PageHeading>Devices</PageHeading>
        </AppBar>
      </PageHeader>
      {!isLoading && (
        <Width640>
          <Table
            columns={[
              "Codename",
              "Created On",
              "Type",
              <IconCell key="New Device">
                <IconButton
                  onClick={() => {
                    openDrawer(
                      <NewDeviceForm
                        project={projectId}
                        onCreate={loadDevices}
                      />,
                    );
                  }}
                  title="Open new device form"
                >
                  <AddIcon />
                </IconButton>
              </IconCell>,
            ]}
            emptyState="There are no devices in this project yet."
          >
            {devices.map(device => {
              const codename = device.codename.trim();
              const { id: deviceId } = device;
              return (
                <Row key={device.id} italic={!device.enabled}>
                  <Cell gray={!codename}>
                    <Link
                      to={`/orgs/${orgId}/projects/${projectId}/devices/${deviceId}`}
                    >
                      {codename || "Unnamed device"}
                      {!device.enabled && " (disabled)"}
                    </Link>
                  </Cell>
                  <Cell>{localize(device.createdAt)}</Cell>
                  <Cell>{capitalize(device.type)}</Cell>
                  <Cell />
                </Row>
              );
            })}
          </Table>
        </Width640>
      )}
    </main>
  );
}

DevicesPage.propTypes = {
  orgId: PropTypes.string,
  projectId: PropTypes.string,
};

DevicesPage.defaultProps = {
  orgId: null,
  projectId: null,
};

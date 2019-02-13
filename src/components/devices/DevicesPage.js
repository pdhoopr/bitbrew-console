import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { listDevices } from "../../api";
import { capitalize, localize } from "../../utils";
import GlobalContext from "../GlobalContext";
import useLoading from "../hooks/useLoading";
import { RaisedButton } from "../ui/Buttons";
import { FlexBetween } from "../ui/Flexboxes";
import { PageHeader } from "../ui/Headers";
import { Link } from "../ui/Links";
import Table, { Cell, Row } from "../ui/Table";
import { PageHeading } from "../ui/Texts";
import { Width800 } from "../ui/Widths";
import NewDeviceForm from "./NewDeviceForm";

export default function DevicesPage({ orgId, projectId }) {
  const { openDrawer } = useContext(GlobalContext);

  const [devices, setDevices] = useState([]);

  async function loadDevices() {
    const { items } = await listDevices(projectId);
    setDevices(items);
  }

  const isLoading = useLoading(loadDevices, [projectId]);

  return (
    <main>
      <Width800>
        <PageHeader>
          <FlexBetween>
            <PageHeading>Devices</PageHeading>
            <RaisedButton
              onClick={() => {
                openDrawer(
                  <NewDeviceForm project={projectId} onCreate={loadDevices} />,
                );
              }}
            >
              New
            </RaisedButton>
          </FlexBetween>
        </PageHeader>
        {!isLoading && (
          <Table
            columns={["Codename", "Created On", "Type"]}
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
                </Row>
              );
            })}
          </Table>
        )}
      </Width800>
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

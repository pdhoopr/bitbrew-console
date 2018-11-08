import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { listDevices } from "../../api";
import { capitalize, localize } from "../../utils";
import Context from "../Context";
import useLoading from "../hooks/useLoading";
import AppBar from "../ui/AppBar";
import { IconButton } from "../ui/Buttons";
import { PageHeader } from "../ui/Headers";
import { AddIcon } from "../ui/Icons";
import { Link } from "../ui/Links";
import Table, { Cell, Row } from "../ui/Table";
import { PageTitle } from "../ui/Texts";
import { Width640 } from "../ui/Widths";
import NewDeviceForm from "./NewDeviceForm";

const AddIconWrapper = styled.span`
  display: block;
  margin-bottom: calc(-1 * var(--size-8));
  margin-top: calc(-1 * var(--size-8));
  text-align: right;
`;

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
          <PageTitle>Devices</PageTitle>
        </AppBar>
      </PageHeader>
      {!isLoading && (
        <Width640>
          <Table
            columns={[
              "Codename",
              "Date Created",
              "Type",
              <AddIconWrapper key="New Device">
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
              </AddIconWrapper>,
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
                      {codename || "Untitled device"}
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

import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { viewDevice } from "../../api";
import { capitalize, localize } from "../../utils";
import Context from "../Context";
import useLoading from "../hooks/useLoading";
import AppBar from "../ui/AppBar";
import { RaisedButton } from "../ui/Buttons";
import DeleteButton from "../ui/DeleteButton";
import { FlexBetween } from "../ui/Flexboxes";
import { PageHeader } from "../ui/Headers";
import { BackIcon, SyncDisabledIcon, SyncIcon } from "../ui/Icons";
import { IconLink } from "../ui/Links";
import List from "../ui/List";
import { Content, Section } from "../ui/Sections";
import { PageHeading, SectionHeading, SubHeading } from "../ui/Texts";
import { Width640 } from "../ui/Widths";
import DeleteDeviceDialog from "./DeleteDeviceDialog";
import EditDeviceForm from "./EditDeviceForm";

const Heading = styled(PageHeading)`
  margin-left: var(--size-16);
  margin-right: auto;
`;

export default function DeviceOverviewPage({
  deviceId,
  navigate,
  orgId,
  projectId,
}) {
  const { openDialog, openDrawer } = useContext(Context);

  const [device, setDevice] = useState({});

  async function loadDevice() {
    const data = await viewDevice(deviceId);
    setDevice(data);
  }

  const isLoading = useLoading(loadDevice, [deviceId]);

  const devicesUrl = `/orgs/${orgId}/projects/${projectId}/devices`;
  const type = device.type ? capitalize(device.type.trim()) : "";
  return (
    <main>
      <PageHeader>
        <AppBar>
          <IconLink to={devicesUrl} title="View all devices for this project">
            <BackIcon />
          </IconLink>
          <Heading>{device.codename || <span>&nbsp;</span>}</Heading>
        </AppBar>
      </PageHeader>
      {!isLoading && (
        <Width640>
          <Section>
            <FlexBetween>
              <SectionHeading>Overview</SectionHeading>
              <RaisedButton
                onClick={() => {
                  openDrawer(
                    <EditDeviceForm device={device} onUpdate={loadDevice} />,
                  );
                }}
              >
                Edit
              </RaisedButton>
            </FlexBetween>
            <Content>
              <List
                items={[
                  ["ID", device.id],
                  [
                    "Enabled",
                    device.enabled ? (
                      <span
                        title="This device is enabled"
                        aria-label="This device is enabled"
                      >
                        <SyncIcon />
                      </span>
                    ) : (
                      <span
                        title="This device is disabled"
                        aria-label="This device is disabled"
                      >
                        <SyncDisabledIcon />
                      </span>
                    ),
                  ],
                  [
                    "Created On",
                    localize(device.createdAt, {
                      time: true,
                    }),
                  ],
                  [
                    "Last Modified On",
                    localize(device.updatedAt, {
                      time: true,
                    }),
                  ],
                ]}
              />
            </Content>
          </Section>
          <Section>
            <SectionHeading>Device Settings</SectionHeading>
            <SubHeading gray>
              Details about your device that are relevant to its type.
            </SubHeading>
            <Content>
              {type.toUpperCase() === "DATALOGGER" && (
                <List
                  items={[
                    ["Type", type],
                    ["Serial Number", device.serialNumber],
                    ["IMEI", device.imei],
                  ]}
                />
              )}
            </Content>
          </Section>
          <DeleteButton
            onClick={() => {
              openDialog(
                <DeleteDeviceDialog
                  device={device}
                  onDelete={() => {
                    navigate(devicesUrl);
                  }}
                />,
              );
            }}
          >
            Delete device
          </DeleteButton>
        </Width640>
      )}
    </main>
  );
}

DeviceOverviewPage.propTypes = {
  deviceId: PropTypes.string,
  navigate: PropTypes.func,
  orgId: PropTypes.string,
  projectId: PropTypes.string,
};

DeviceOverviewPage.defaultProps = {
  deviceId: null,
  navigate: null,
  orgId: null,
  projectId: null,
};

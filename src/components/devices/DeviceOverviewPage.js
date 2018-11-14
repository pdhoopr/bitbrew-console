import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { viewDevice, viewOrg, viewProject } from "../../api";
import { capitalize, localize } from "../../utils";
import Context from "../Context";
import useLoading from "../hooks/useLoading";
import AppBar from "../ui/AppBar";
import { RaisedButton } from "../ui/Buttons";
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

const EditDeviceButton = styled(RaisedButton)`
  background-color: var(--color-black);
  margin-left: auto;
  margin-right: var(--size-16);
`;

export default function DeviceOverviewPage({ deviceId, orgId, projectId }) {
  const { openDialog, openDrawer } = useContext(Context);

  const [device, setDevice] = useState({});
  const [project, setProject] = useState({});
  const [org, setOrg] = useState({});

  async function loadDevice() {
    const [data, projectData, orgData] = await Promise.all([
      viewDevice(deviceId),
      viewProject(projectId),
      viewOrg(orgId),
    ]);
    setDevice(data);
    setProject(projectData);
    setOrg(orgData);
  }

  const isLoading = useLoading(loadDevice, [deviceId, projectId, orgId]);

  const type = device.type ? capitalize(device.type.trim()) : "";
  return (
    <main>
      <PageHeader>
        <AppBar>
          <IconLink
            to={`/orgs/${orgId}/projects/${projectId}/devices`}
            title="View all devices for this project"
          >
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
              <EditDeviceButton
                onClick={() => {
                  openDrawer(
                    <EditDeviceForm device={device} onUpdate={loadDevice} />,
                  );
                }}
              >
                Edit
              </EditDeviceButton>
              <RaisedButton
                onClick={() => {
                  openDialog(
                    <DeleteDeviceDialog
                      device={{
                        ...device,
                        projectName: project.name,
                        orgName: org.name,
                      }}
                      onDelete={() => {
                        navigate(
                          `/orgs/${orgId}/projects/${projectId}/devices`,
                        );
                      }}
                    />,
                  );
                }}
                red
              >
                Delete
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
              Additional details about your device that are relevant to its
              type.
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
        </Width640>
      )}
    </main>
  );
}

DeviceOverviewPage.propTypes = {
  deviceId: PropTypes.string,
  orgId: PropTypes.string,
  projectId: PropTypes.string,
};

DeviceOverviewPage.defaultProps = {
  deviceId: null,
  orgId: null,
  projectId: null,
};

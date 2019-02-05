import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { viewDevice } from "../../api";
import { capitalize, localize } from "../../utils";
import GlobalContext from "../GlobalContext";
import useLoading from "../hooks/useLoading";
import BackLink from "../ui/BackLink";
import { RaisedButton } from "../ui/Buttons";
import DeleteButton from "../ui/DeleteButton";
import { FlexBetween } from "../ui/Flexboxes";
import { PageHeader } from "../ui/Headers";
import { SyncDisabledIcon, SyncIcon } from "../ui/Icons";
import List from "../ui/List";
import { Content, Section } from "../ui/Sections";
import { PageHeading, SectionHeading, SubHeading } from "../ui/Texts";
import { Width640 } from "../ui/Widths";
import DeleteDeviceDialog from "./DeleteDeviceDialog";
import EditDeviceForm from "./EditDeviceForm";

export default function DeviceInfoPage({
  deviceId,
  navigate,
  orgId,
  projectId,
}) {
  const { openDialog, openDrawer } = useContext(GlobalContext);

  const [device, setDevice] = useState({});

  async function loadDevice() {
    const data = await viewDevice(deviceId);
    setDevice(data);
  }

  const isLoading = useLoading(loadDevice, [deviceId]);

  const devicesUrl = `/orgs/${orgId}/projects/${projectId}/devices`;
  const codename = device.codename && device.codename.trim();
  const type = device.type ? capitalize(device.type.trim()) : "";
  return (
    <main>
      <Width640>
        <BackLink to={devicesUrl} title="Back to all devices" />
        {!isLoading && (
          <React.Fragment>
            <PageHeader>
              <FlexBetween>
                <PageHeading gray={!codename}>
                  {codename || "Unnamed device"}
                </PageHeading>
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
            </PageHeader>
            <Section>
              <SectionHeading>Overview</SectionHeading>
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
              Delete this device
            </DeleteButton>
          </React.Fragment>
        )}
      </Width640>
    </main>
  );
}

DeviceInfoPage.propTypes = {
  deviceId: PropTypes.string,
  navigate: PropTypes.func,
  orgId: PropTypes.string,
  projectId: PropTypes.string,
};

DeviceInfoPage.defaultProps = {
  deviceId: null,
  navigate: null,
  orgId: null,
  projectId: null,
};

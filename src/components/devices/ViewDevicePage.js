import PropTypes from "prop-types";
import React, { useContext } from "react";
import { viewDevice } from "../../api";
import { List, ListItem } from "../../design-system";
import { capitalize } from "../../utils";
import AppContext from "../AppContext";
import { deviceType } from "../shared/resourceTypes";
import Section from "../shared/Section";
import useLoading from "../shared/useLoading";
import useResource from "../shared/useResource";
import ViewPage from "../shared/ViewPage";
import DeleteDeviceDialog from "./DeleteDeviceDialog";
import UpdateDeviceForm from "./UpdateDeviceForm";

export default function ViewDevicePage({ deviceId, navigate }) {
  const { openDialog, openDrawer } = useContext(AppContext);

  const [device, setDevice] = useResource(deviceType, {});

  async function loadDevice() {
    const data = await viewDevice(deviceId);
    setDevice(data);
  }

  const isLoading = useLoading(loadDevice, [deviceId]);

  const type = device.type || "";
  return (
    <ViewPage
      isLoading={isLoading}
      resource={device}
      onOpenForm={() => {
        openDrawer(<UpdateDeviceForm device={device} onUpdate={loadDevice} />);
      }}
      onOpenDialog={() => {
        openDialog(
          <DeleteDeviceDialog
            device={device}
            onDelete={() => {
              navigate("../");
            }}
          />,
        );
      }}
    >
      <Section
        heading="Device Settings"
        description="Details about your device that are relevant to its type."
      >
        <List>
          <ListItem heading="Type">{capitalize(type)}</ListItem>
          {type.toUpperCase() === "DATALOGGER" && (
            <>
              <ListItem heading="Serial Number">{device.serialNumber}</ListItem>
              <ListItem heading="IMEI">{device.imei}</ListItem>
            </>
          )}
        </List>
      </Section>
    </ViewPage>
  );
}

ViewDevicePage.propTypes = {
  deviceId: PropTypes.string,
  navigate: PropTypes.func,
};

ViewDevicePage.defaultProps = {
  deviceId: null,
  navigate: null,
};

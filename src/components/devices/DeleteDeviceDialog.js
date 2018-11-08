import PropTypes from "prop-types";
import React from "react";
import { deleteDevice, listDevices } from "../../api";
import { poll } from "../../utils";
import DeleteDialog from "../ui/DeleteDialog";
import Panel from "../ui/Panel";
import { Text } from "../ui/Texts";

export default function DeleteDeviceDialog({ device, onDelete }) {
  return (
    <DeleteDialog
      title="Delete Device"
      onDelete={async () => {
        await deleteDevice(device.id);
        await poll(async () => {
          const { items } = await listDevices(device.projectId);
          return items.every(item => item.id !== device.id);
        });
        await onDelete();
      }}
    >
      <Text>
        The following device will be permanently deleted, and the platform will
        no longer accept any data sent from this device:
      </Text>
      <Panel
        items={[
          ["Device", device.codename],
          ["Project", device.projectName],
          ["Organization", device.orgName],
        ]}
      />
      <Text>Are you sure you want to continue?</Text>
    </DeleteDialog>
  );
}

DeleteDeviceDialog.propTypes = {
  onDelete: PropTypes.func.isRequired,
  device: PropTypes.shape({
    codename: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    orgName: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
    projectName: PropTypes.string.isRequired,
  }).isRequired,
};

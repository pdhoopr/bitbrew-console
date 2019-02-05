import PropTypes from "prop-types";
import React from "react";
import { deleteDevice, listDevices } from "../../api";
import { poll } from "../../utils";
import DeleteDialog from "../ui/DeleteDialog";
import { Text } from "../ui/Texts";

export default function DeleteDeviceDialog({ device, onDelete }) {
  const codename = device.codename.trim();
  return (
    <DeleteDialog
      heading="Delete Device"
      onDelete={async () => {
        await deleteDevice(device.id);
        await poll(async () => {
          const { items } = await listDevices(device.projectId);
          return items.every(item => item.id !== device.id);
        });
        await onDelete();
      }}
    >
      Are you sure you want to delete the device{" "}
      <Text as="strong" gray={!codename}>
        {codename || "Unnamed device"}
      </Text>
      ? The platform will no longer accept any data sent from this device.
    </DeleteDialog>
  );
}

DeleteDeviceDialog.propTypes = {
  device: PropTypes.shape({
    codename: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

import PropTypes from "prop-types";
import React from "react";
import { deleteDevice, listDevices } from "../../api";
import { poll } from "../../utils";
import DeleteDialog from "../shared/DeleteDialog";

export default function DeleteDeviceDialog({ device, onDelete }) {
  return (
    <DeleteDialog
      resource={device}
      onConfirm={async () => {
        await deleteDevice(device.id);
        await poll(async () => {
          const { items } = await listDevices(device.projectId);
          return items.every(item => item.id !== device.id);
        });
        await onDelete();
      }}
    >
      The platform will no longer accept any data it sends.
    </DeleteDialog>
  );
}

DeleteDeviceDialog.propTypes = {
  device: PropTypes.shape({
    id: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

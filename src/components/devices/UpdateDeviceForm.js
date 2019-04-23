import PropTypes from "prop-types";
import React from "react";
import { listDevices, updateDevice } from "../../api";
import { poll } from "../../utils";
import { deviceType } from "../shared/resourceTypes";
import UpdateForm from "../shared/UpdateForm";
import useForm from "../shared/useForm";
import DeviceFormFields from "./DeviceFormFields";

export default function UpdateDeviceForm({ device, onUpdate }) {
  const [values, setValue] = useForm({
    projectId: device.projectId,
    codename: device.codename,
    enabled: device.enabled,
    type: device.type,
    serialNumber: device.serialNumber,
    imei: device.imei,
  });

  return (
    <UpdateForm
      resourceType={deviceType}
      onSubmit={async () => {
        const data = await updateDevice(device.id, values);
        await poll(async () => {
          const { items } = await listDevices(data.projectId);
          const found = items.find(item => item.id === data.id);
          return !found || found.updatedAt === data.updatedAt;
        });
        await onUpdate();
      }}
    >
      <DeviceFormFields values={values} onChange={setValue} />
    </UpdateForm>
  );
}

UpdateDeviceForm.propTypes = {
  device: PropTypes.shape({
    codename: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
    imei: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
    serialNumber: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

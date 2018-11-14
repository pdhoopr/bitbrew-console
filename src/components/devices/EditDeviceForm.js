import PropTypes from "prop-types";
import React from "react";
import { listDevices, updateDevice } from "../../api";
import { poll } from "../../utils";
import useForm from "../hooks/useForm";
import FormDrawer from "../ui/FormDrawer";
import DeviceFormFields from "./DeviceFormFields";

export default function EditDeviceForm({ device, onUpdate }) {
  const [values, setValue] = useForm({
    projectId: device.projectId,
    codename: device.codename,
    enabled: device.enabled,
    type: device.type,
    serialNumber: device.serialNumber,
    imei: device.imei,
  });

  return (
    <FormDrawer
      heading="Edit Device"
      buttonText="Save"
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
      <DeviceFormFields values={values} setValue={setValue} edit />
    </FormDrawer>
  );
}

EditDeviceForm.propTypes = {
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
